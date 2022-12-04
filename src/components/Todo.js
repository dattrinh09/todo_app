import React from "react"

const Todo = ({
    id,
    title,
    completed,
    onMark,
    onDelete
}) => {
    return (
        <li
            className={completed ? 'completed' : ''}
            key={id}
        >
            {title}
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onMark(id)}
            />
            <button
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </li>
    )
}

export default Todo