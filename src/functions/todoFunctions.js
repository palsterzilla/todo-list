const createList = () => {
  const list = { todos: [] }

  return {
    add(title, detail, due, priority) {
      list.todos.push({
        id: list.todos.length + 1,
        title,
        detail,
        due,
        priority,
        isDone: false,
      });
      
      // helper
      console.table(list.todos)

    },
    read() {
      return list.todos
    },
    update(id, title, detail, due, priority) {
      list.todos.find(item => {
        if (item.id === id) {
          item.title = title;
          item.detail = detail;
          item.due = due;
          item.priority = priority;
        }
      })
    },
    delete(id) {
      list.todos = list.todos.filter(item => item.id !== id);
      for (let i = 0, id = 1; i < list.todos.length; i++, id++) {
        list.todos[i].id = id;
      }
    },
    toggle(id) {
      list.todos.find(item => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
      })
    }
  }
}

const addToList = (model) => {
  const title = document.getElementById('title').value;
  const detail = document.getElementById('detail').value;
  const due = document.getElementById('dueDate').value;
  const priority = document.querySelector('input[type=radio]:checked').value

  model.add(title, detail, due, priority);
}

const editList = (model) => {
  const editId = +document.getElementById('editId').value;
  const editTitle = document.getElementById('editTitle').value;
  const editDetail = document.getElementById('editDetail').value;
  const editDue = document.getElementById('editDue').value;
  const editPriority = document.querySelector('input[name="edit_priority"]:checked').value;

  model.update(editId, editTitle, editDetail, editDue, editPriority);
}

const myList = createList();

export { createList, addToList, myList, editList }
