export const fetchTodos = (request) => (dispatch) => {
    dispatch(todosFetching());
    request("http://localhost:3001/todos")
        .then(data => dispatch(todosFetched(data)))
        .catch(() => dispatch(todossFetchingError));
}

export const todosFetching = () => {
    return {
        type: 'TODOS_FETCHING'
    }
}

export const todosFetched = (todos) => {
    return {
        type: 'TODOS_FETCHED',
        payload: todos
    }
}

export const todossFetchingError = () => {
    return {
        type: 'TODOS_FETCHING_ERROR'
    }
}

export const todoAdded = (todo) => {
    return {
        type: 'TODO_ADDED',
        payload: todo
    }
}

export const todoDeleted = (id) => {
    return {
        type: 'TODO_DELETED',
        payload: id
    }
}

export const todoUpdated = (todo) => ({
    type: 'TODO_UPDATED',
    payload: todo
})

