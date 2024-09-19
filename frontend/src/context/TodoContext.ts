import { createContext } from "react";
import TodoStore from "../store/TodoStore";

const TodoContext = createContext<TodoStore>(new TodoStore());

export { TodoContext }