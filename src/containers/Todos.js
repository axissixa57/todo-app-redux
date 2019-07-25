import { connect } from 'react-redux';

import { deleteTodo, toggleTodo, fetchTodos } from '../actions/todos';
import TodoList from '../components/TodoList';

const newStateFromStoreToArr = todos => Object.keys(todos).map(id => todos[id]);
// автоматом после того как отработал action getTodos(), 
// его результат заносится в параметр
const mapStateToProps = ({ todos }) => {
  
  return {
    todos: newStateFromStoreToArr(todos),
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onTodoClick: id => dispatch(toggleTodo(id)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    getTodos: () => dispatch(fetchTodos()),
  };
};

// connect позволяет связать хранилище и компонент
// после того как отработал action из mapDispatchToProps
// state из store попадёт в mapStateToProps !!!!!!!!!
// отобразятся в this.props у component TodoList
const Todos = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default Todos;
