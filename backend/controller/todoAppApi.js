import todoList from "../model/todoList.js";

const getTodoList = (req, res) => {
    todoList.find((err, data) => {
        if (err) {
            res.status(500).send("Error in gettodolist 500")
        } else {
            res.status(200).send(data)
        }
    })
}
export default getTodoList
export const addToTodo = (req, res) => {
    const body = req.body
    todoList.create(body, (err, data) => {
        if (err) {
            res.status(500).send("Error in gettodolist 500")
        } else {
            res.status(200).send(data)
        }
    })
}

export const deleteItem = (req, res) => {
    const body = req.body
    todoList.deleteMany({
        _id: {
            $in: body
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send("Something went wrong");
        } else {
            res.status(200).send(result);
        }
    });

}
export const updateItem = (req, res) => {
    const body = req.body
    todoList.findByIdAndUpdate(body._id, body, (err, result) => {
        if (err) {
            res.status(500).send("Something went wrong");
        } else {
            res.status(200).send(result);
        }
    });

}

