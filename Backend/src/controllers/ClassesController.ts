import {Request, Response} from 'express';

import database from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(request: Request, response: Response){ //Listagem das aulas
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day || !filters.time){
            return response.status(400).json({
                error: "Missing filters to search classes"
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await database('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                }) //Se existe aula no dia e horário filtrado
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=','users.id')
            .select(['classes.*','users.*']); //inner join da tabela de usuários e aulas com o filtro ativo

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const transactions = await database.transaction(); //variável para armazenar as operações
    
        try{
            const insertedUserIds = await transactions('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            }); //Adicionando um usuário ao banco de dados
        
            const user_id = insertedUserIds[0];
        
            const insertedClassesIds = await transactions('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
        
            await transactions('class_schedule').insert(classSchedule);
        
            await transactions.commit(); //Insere as informações no banco de dados
        
            return response.status(201).send(); //Status 201 -> Retornado com sucesso
        } catch (err){ //Se algum erro acontecer
            await transactions.rollback(); //Desfaz as operações feitas
            console.log(err);
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}