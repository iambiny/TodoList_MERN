import { observer } from "mobx-react";
import { useContext } from "react";
import { TodoContext } from "./context/TodoContext";

export const Pagination = observer(() => {
    const todoStore = useContext(TodoContext);
    const totalTodos = todoStore.totalTodos;
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalTodos / todoStore.todosPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((page, index) => (
                <button 
                    className={page === todoStore.currentPage ? 'active' : ''}
                    key={index} onClick={() => todoStore.currentPage = page}>{page}</button>
            ))}
        </div>
    )
})