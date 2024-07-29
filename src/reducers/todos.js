const initialState = {
    todos: [],
    todosLoadingStatus: 'idle'
}

const todosList = (state = initialState, action) => {
    switch (action.type) {
        case 'TODOS_FETCHING':
            return {
                ...state,
                todosLoadingStatus: 'loading'
            }
        case 'TODOS_FETCHED':
            return {
                ...state,
                todos: action.payload,
                todosLoadingStatus: 'idle'
            }
        case 'TODOSS_FETCHING_ERROR':
            return {
                ...state,
                todosLoadingStatus: 'error'
            }
        case 'TODO_ADDED':
            return {
                ...state,
                todos: [...state.todos, action.payload],
                delAddStatus: 'Todo added'
            }
        case 'TODO_DELETED':
            return {
                ...state,
                todos: state.todos.filter(item => item.id !== action.payload),
                delAddStatus: 'Todo deleted'
            }
        case 'TODO_UPDATED':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
                delAddStatus: 'Todo edited'
            };
        default: return state;
    }

}

export default todosList;