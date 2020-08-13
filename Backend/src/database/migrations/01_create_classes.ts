import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => { 
        table.increments('id').primary(); 
        table.string('subject').notNullable(); 
        table.decimal('cost').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id').inTable('users') //Referência ao campo id da tabela de usuários
            .onUpdate('CASCADE') //Se um professor é atualizado, todas as suas aulas também são atualizadas
            .onDelete('CASCADE'); //Se um professor é deletado, todas suas aulas também são deletadas
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes'); 
} 