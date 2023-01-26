const todoFactory = (title, dueDate, priority, isDone, notes = "", showNotes=false) => {
  return {
    title,
    dueDate,
    priority,
    isDone,
    notes,
    showNotes,
  };
};

export { todoFactory };