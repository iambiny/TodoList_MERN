import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean
    },
    userID: {
        type: String,
        required: true
    }
});
export const TodoModel = mongoose.model('Todo', TodoSchema);
