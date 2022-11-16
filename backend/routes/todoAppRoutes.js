import express from 'express'
import todoAppApi, { addToTodo, deleteItem, updateItem } from '../controller/todoAppApi.js'

const route = express.Router()

route.get('/todoList', todoAppApi)
route.post('/addtodoList', addToTodo)
route.post('/deleteItem', deleteItem)
route.post('/updateItem', updateItem)

export default route

