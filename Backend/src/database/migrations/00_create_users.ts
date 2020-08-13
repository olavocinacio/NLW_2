import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => { //Cria a tabela de usuários
        //Criando campos da tabela
        table.increments('id').primary(); //campo que se auto-implementa sempre que um usuário é cadastrado
        table.string('name').notNullable(); //notNullable(); -> Não pode ser nulo
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });    
} //Cria uma tabela ou altera um campo

export async function down(knex: Knex){
    return knex.schema.dropTable('users'); //Exclui a tabela
} //Desfaz uma alteração (Criação ou modificação de uma tabela)