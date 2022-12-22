"use strict";
// import dotenv from "dotenv";
// dotenv.config();
// import app from "../../app";
// import { startSequelize } from "../../models";
// import { Sequelize } from "sequelize";
// import { createTodo } from "../../repository/Todo.repo";
// import request from "supertest";
// import environment from '../../models/configDBs';
// describe('Todo routes', () => {
//     let testDB: Sequelize;
//     // teasegura que se ejecuta antes que las pruebas se ejecuten
//     beforeAll(async () => {
//         testDB = startSequelize(environment.test.database, environment.test.password, environment.test.host, environment.test.username);
//         await testDB.sync({ force: true });
//         await createTodo('test for GET');
//         await createTodo('test for PUT');
//         await createTodo('test for DELETE');
//     })
//     afterAll(async () => {
//         await testDB.close();
//     })
//     it('[POST] /todos - should return 201 after its creation', async () => {
//         const res = await request(app)
//             .post('/todos')
//             .send({ description: 'Unit testing with Jest and Supertest' });
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//             id: 4
//         })
//     })
//     it('[POST] /todos - should return 400 after receiving incorrect body', async() => {
//         const res = await request(app)
//             .post('/todos')
//             .send({})
//             expect(res.statusCode).toEqual(400);
//             expect(res.body).toEqual({
//                 message: 'No description'
//             })
//     })
//     it('[GET] /:todoId - should return  200 an the found entity', async() => {
//         const res = await request(app)
//             .get('/todos/1')
//             .send();
//         expect(res.statusCode).toEqual(200);
//         //Nos ayuda a checar si una propiedad existe
//         expect(res.body).toHaveProperty('id', 1);
//         expect(res.body).toHaveProperty('description', 'test for GET');
//         expect(res.body).toHaveProperty('is_completed', false);
//     })
//     it('[GET] /:todoId - should return  400 if the id is out of range', async() => {
//         const res = await request(app)
//             .get('/todos/0')
//             .send();
//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toEqual({
//             error: 'Invalid id'
//         })
//     })
//     it('[GET] /:todoId - should return 400 if the id is not found', async() => {
//         const res = await request(app)
//             .get('/todos/432')
//             .send()
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toEqual({
//             error: 'Todo not found'
//         })
//     })
//     it('[PUT] /:todoId - should return 200 if the update goes through', async() => {
//         const res = await request(app)
//             .put('/todos/2')
//             .send({
//                 id:2,
//                 description: 'test for PUT - updated',
//                 is_completed: true
//             })
//             expect(res.statusCode).toBe(200);
//             expect(res.body).toHaveProperty('id', 2);
//             expect(res.body).toHaveProperty('description', 'test for PUT - updated');
//             expect(res.body).toHaveProperty('is_completed', true);
//     })
//     it('[PUT] /:todoId - should return 400 if the id is out of range', async() => {
//         const res = await request(app)
//             .put('/todos/0')
//             .send({})
//             expect(res.statusCode).toEqual(400);
//             expect(res.body).toEqual({
//                 error: 'Invalid id'
//             })
//     })
//     it('[PUT] /:todoId - should return 400 if the id is not found', async() => {
//         const res = await request(app)
//             .put('/todos/234')
//             .send({
//                 id:2,
//                 description: 'test for PUT - updated',
//                 is_completed: true
//             })
//             expect(res.statusCode).toBe(400);
//             expect(res.body).toEqual({
//                 error: 'Update failed'
//             })
//     })
//     it('[DELETE]] /:todoId - should return 200', async() => {
//         const res = await request(app)
//             .delete('/todos/3')
//             .send()
//             //El 204 es para saber que si se elimino pero no esperes nada en el body
//             expect(res.statusCode).toBe(204);
//             expect(res.body).toEqual({})
//     })
// })
