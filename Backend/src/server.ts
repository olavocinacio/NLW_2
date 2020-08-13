import express from 'express';
//Permite o frontend em um endereço localhost:3000 se comunicar com o backend no endereço localhost:3333
import cors from 'cors';
import routes from './routes';

//Cria a aplicação
const app = express();
app.use(cors());
//Converte o request body em um json
app.use(express.json());
//importando rotas
app.use(routes)

//Uma rota é um endereço
//Recurso é o que a rota está requisitando
// --------------MÉTODOS----------------
//GET: Buscar ou listar uma informação
//POST: Criar alguma informação
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente
// -------------PARÂMETROS--------------
//Corpo(Request Body): Dados para criação ou atualização de um registro
//Route params: Identificar qual recurso será atualizado ou deletado
//Query Params: Paginação, filtros, ordenação

//Permite que a aplicação "escute" eventos
app.listen(3333); //localhost:3333

