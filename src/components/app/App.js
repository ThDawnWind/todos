import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Title from '../title/Title';
import TodosAddForm from '../todosAddForm/TodosAddForm';
import TodosTable from '../todosTable/TodosTable';
import FilterBtn from '../filterBtn/FilterBtn';

import './app.scss';

function App() {

  const [filter, setFilter] = useState();

  const onHandleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <main className="App">
      <TransitionGroup className="content">
        <CSSTransition
          in={true}
          appear={true}
          timeout={800}
          classNames="fade"
        >
          <div className='content'>
            <Title />
            <div>
              <TodosAddForm />
              <div className='btns'>
                <FilterBtn onFilterChange={onHandleFilterChange} />
              </div>
            </div>
            <div className='todosTable'>
              <TodosTable filter={filter} />
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
}

export default App;