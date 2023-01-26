const projectFactory = (name, todoList = []) => {
  const numTodo = () => {
    return todoList.length;
  };

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const deleteTodo = (todoIdx) => {
    todoList.splice(todoIdx, 1);
  };

  return {
    name,
    todoList,
    numTodo,
    addTodo,
    deleteTodo,
  };
};

export { projectFactory };