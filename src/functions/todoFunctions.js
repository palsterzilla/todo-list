import { format } from "date-fns";

const createList = () => {
  const list = { todos: [] }

  return {
    add(title, detail, dueDate, priority) {
      list.todos.push({
        id: list.todos.length + 1,
        title,
        detail,
        dueDate,
        priority,
        isDone: false,
      });
      
      // helper
      console.table(list.todos)

    },
    read() {
      return list.todos
    },
    delete(id) {
      list.todos = list.todos.filter(item => item.id !== id);
      for (let i = 0, id = 1; i < list.todos.length; i++, id++) {
        list.todos[i].id = id;
      }
    }
  }
}

const addToList = (model) => {
  const title = document.getElementById('title').value;
  const detail = document.getElementById('detail').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document
    .querySelector('input[type=radio]:checked')
    .labels[0].textContent;

  model.add(title, detail, dueDate, priority);
}

const myList = createList();

export { createList, addToList, myList }
