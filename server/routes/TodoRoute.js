const express = require('express');
const { deleteTodo } = require('../controllers/todoControllers/DeleteTodoController');
const {getTodo} = require('../controllers/todoControllers/GetTodoController');
const { postTodo } = require('../controllers/todoControllers/PostTodoController');
const {patchTodo} = require('../controllers/todoControllers/PatchTodoController');
const TodoRoute = express.Router();

//Här har jag skapat en route för alla controllers som styr allt kopplat till att göra-listan.
TodoRoute.get('/api/get', getTodo);
TodoRoute.post('/api/post', postTodo);
TodoRoute.delete('/api/remove/:id', deleteTodo);
TodoRoute.patch('/api/update/:id', patchTodo);

exports.TodoRoute = TodoRoute;