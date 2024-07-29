import React from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { todoAdded } from '../../actions/index';
import { v4 as uuidv4 } from 'uuid';

import './todosAddForm.scss';

const Todos = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const validationSchema = Yup.object({
    newTodo: Yup.string()
      .min(7, 'Must be at least 7 characters')
      .max(20, 'Must be 20 characters or less')
  });

  return (
    <Formik
      initialValues={{ newTodo: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const todo = {
          id: uuidv4(),
          text: values.newTodo,
          status: false
        };
        request("http://localhost:3001/todos", "POST", JSON.stringify(todo))
          .then(res => {
            resetForm();
            dispatch(todoAdded(todo));
          })
          .catch(err => console.log(err));
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className='form'>
          <ErrorMessage name="newTodo" component="div" className="form__error-message" />
          <Field
            type="text"
            name="newTodo"
            placeholder="Enter your text"
            className='form__styled-input'
          />
          <button type="submit" className='form__styled-button' disabled={!values.newTodo.trim() || isSubmitting}>
            +
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Todos;
