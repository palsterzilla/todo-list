import { format, add } from "date-fns";

const createList = () => {
  const list = { todos: [] }
  const TODAY = format(new Date(), 'yyyy-MM-dd');
  const WEEK = format(add(new Date(), {days: 6}), 'yyyy-MM-dd');

  return {
    add(title, detail, due, priority) {
      list.todos.push({
        id: (list.todos.length + 1).toString(),
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

      // helper
      console.table(list.todos)
    },
    delete(id) {
      list.todos = list.todos.filter(item => item.id !== id);
      for (let i = 0, id = 1; i < list.todos.length; i++, id++) {
        list.todos[i].id = id.toString();
      }

      // helper
      console.table(list.todos)
    },
    toggle(id) {
      list.todos.find(item => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
      })

      // helper
      console.table(list.todos)
    },
    readToday() {
      return list.todos.filter(item => {
        return item.due === TODAY
      })
    },
    readWeek() {
      return list.todos.filter(item => {
        return  item.due >= TODAY &&
                item.due <= WEEK
      })
    },
  }
}

const addToList = (model) => {
  const addTitle = document.getElementById('addTitle').value;
  const addDetail = document.getElementById('addDetail').value;
  const addDue = document.getElementById('addDue').value;
  const addPriority = document.querySelector('input[name="add_priority"]:checked').value

  model.add(addTitle, addDetail, addDue, addPriority);
}

const editList = (model) => {
  const editId = document.getElementById('editId').value;
  const editTitle = document.getElementById('editTitle').value;
  const editDetail = document.getElementById('editDetail').value;
  const editDue = document.getElementById('editDue').value;
  const editPriority = document.querySelector('input[name="edit_priority"]:checked').value;

  model.update(editId, editTitle, editDetail, editDue, editPriority);
}

const myList = createList();

export { createList, addToList, myList, editList }
