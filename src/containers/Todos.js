import React from 'react';
import { useShallowEqualSelector, useActions } from '../hooks/redux';

import { deleteTodo, toggleTodo, fetchTodos } from '../actions/todos';
import TodoList from '../components/TodoList';

const newStateFromStoreToArr = todos => Object.keys(todos).map(id => todos[id]);

const actions = {
  onTodoClick: id => toggleTodo(id),
  deleteTodo: id => deleteTodo(id),
  getTodos: () => fetchTodos(),
};

// замена connect(mapStateToProps,mapDispatchToProp)(TodoList);
const Todos = () => {
  // передаёт state из store после отработанного action
  const todos = useShallowEqualSelector(({ todos }) => newStateFromStoreToArr(todos));
  const listActions = useActions(actions);

  return <TodoList todos={todos} {...listActions} size={10} />;
};

// если Todos принимает какие-то компоненты, 
// а т.к. это функциональный компонент он будет обновлятся update этих props-ов поэтому использем такую ф-цию как React.memo
// она работает как pure components для классов либо как shouldComponentUpdate()
// т.е. добавив её не будет обновлятся, перерендериваться компонент, если у его props-ов поменялись ссылки, но не поменялись сам props-ы
export default React.memo(Todos);
