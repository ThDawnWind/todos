import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, todoDeleted, todoUpdated } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './todosTable.scss';

const TodosTable = ({ filter }) => {
    const todos = useSelector(state => state.todos);
    let btn = filter;

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const { request } = useHttp();
    const dispatch = useDispatch();

    const inputRefs = useRef({});

    useEffect(() => {
        dispatch(fetchTodos(request));
    }, [dispatch, request, editText]);


    useEffect(() => {
        if (editId !== null && inputRefs.current[editId]) {
            inputRefs.current[editId].focus();
        }
    }, [editId, request]);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/todos/${id}`, 'DELETE')
            .then(() => dispatch(todoDeleted(id)))
            .catch(err => console.log(err));
    }, [dispatch, request]);

    const onHandleClick = useCallback((id) => {
        const todo = todos.find(todo => todo.id === id);
        const updatedTodo = {
            id,
            status: !todo.status
        };

        request(`http://localhost:3001/todos/${id}`, 'PATCH', JSON.stringify(updatedTodo))
            .then(() => {
                dispatch(todoUpdated(updatedTodo));
            })
            .catch(err => console.log(err));
    }, [todos, dispatch, request]);

    const onEditText = useCallback((id, text) => {
        setEditId(id);
        setEditText(text);
    }, []);

    const onCancel = useCallback(() => {
        setEditId(null);
        setEditText('');
    }, []);

    const onSave = (id) => {
        const updatedTodo = {
            id,
            text: editText
        };

        request(`http://localhost:3001/todos/${id}`, 'PUT', JSON.stringify(updatedTodo))
            .then(() => {
                dispatch(todoUpdated(todoDeleted));
                setEditId(null);
                setEditText('');
            })
            .catch(err => console.log(err));
    };

    const filteredTodos = useMemo(() => {
        let doneArrFiltred = todos.filter(item => item.status !== true);
        let undoneArrFiltred = todos.filter(item => item.status === true);
        return btn ? undoneArrFiltred : doneArrFiltred;
    }, [todos, btn]);

    const renderTodos = (arr) => {

        return arr.map(({ id, text, status }) => (
            <CSSTransition
                key={id}
                timeout={300}
                classNames="fade"
            >

                <div className="card">
                    <button onClick={() => onHandleClick(id)} className="card__done-button">✔</button>
                    <button onClick={() => onDelete(id)} className="card__close-button">×</button>     <div className="container">
                        <ul>
                            {editId === id ? (
                                <li>
                                    <input
                                        ref={(el) => inputRefs.current[id] = el}
                                        type="text"
                                        placeholder="Enter your text"
                                        className="card__edit-input"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={onCancel} className='card__cancel-button'>cancel</button>
                                    <button onClick={() => onSave(id)} className='card__save-button'>save</button>
                                </li>
                            ) : (

                                <li className={`card__card-title ${status ? 'active' : ''}`}>
                                    {text}
                                    <button onClick={() => onEditText(id, text)} className="card__edit-button">✎</button>
                                </li>

                            )}
                        </ul>
                    </div>
                </div>
            </CSSTransition>
        ));
    };

    const todosList = renderTodos(filteredTodos);
    return (
        <>
            <TransitionGroup component="ul">
                {todosList}
            </TransitionGroup>
        </>
    );
};

export default TodosTable;
