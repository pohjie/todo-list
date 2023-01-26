import { todoFactory } from "../appObjects/todos"

const createTodo = (title, notes, dueDate, priority, isDone) => {
  return todoFactory(title, notes, dueDate, priority, isDone);
}

const updateTodoIsDone = (todo) => {
  todo.isDone = !todo.isDone;
}

const toggleTodoShowNotes = (todo) => {
  todo.showNotes = !todo.showNotes;
}

export { createTodo, updateTodoIsDone, toggleTodoShowNotes };