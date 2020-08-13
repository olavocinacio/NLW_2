//Knex é uma biblioteca para interpretar javascript como sql
import knex from "knex";
//Módulo para lidar com caminhos
import path from 'path'

//Migrations -> Controle de versão do banco de dados

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //Cria um arquivo database.sqlite dentro da pasta database 
    },
    useNullAsDefault: true,
});

export default database;