import Mongoose from "mongoose";

const todoListSchema = Mongoose.Schema(
    {
        title: { type: String, require: true },
        dis: { type: String, require: true },
        isSelected: { type: Boolean, require: true }
    }
)

export default Mongoose.model("TodoList", todoListSchema)

