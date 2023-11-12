import { format, add } from "date-fns";

const createList = () => {
  const list = { todos: [] }

  if (!localStorage.getItem("list")) {
    localStorage.setItem("list", JSON.stringify(list))

  } else {
    list.todos = JSON.parse(localStorage.getItem("list")).todos;

  }

  const TODAY = format(new Date(), 'yyyy-MM-dd');
  const WEEK = format(add(new Date(), {days: 6}), 'yyyy-MM-dd');

  return {
    add(project, title, detail, due, priority) {
      list.todos.push({
        id: (list.todos.length + 1).toString(),
        project,
        title,
        detail,
        due,
        priority,
        isDone: false,
      });
      localStorage.setItem("list", JSON.stringify(list));
      
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
      localStorage.setItem("list", JSON.stringify(list));

      // helper
      console.table(list.todos)

    },
    delete(criteria) {
      list.todos = list.todos.filter(item => {
        let pattern = /\d/i
        if (pattern.test(criteria)) {
          return item.id !== criteria
          
        } else {
          return item.project !== criteria
        
        }
      });

      for (let i = 0, id = 1; i < list.todos.length; i++, id++) {
        list.todos[i].id = id.toString();
      }
      localStorage.setItem("list", JSON.stringify(list));

      // helper
      console.table(list.todos)

    },
    toggle(id) {
      list.todos.find(item => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
      })
      localStorage.setItem("list", JSON.stringify(list));

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
    readProject(project) {
      return list.todos.filter(item => {
        return item.project === project
      })
    }
  }
}

const addToList = () => {
  const addProject = document.querySelector('[data-activePage].active');
  const addTitle = document.getElementById('addTitle');
  const addDetail = document.getElementById('addDetail');
  const addDue = document.getElementById('addDue');
  const addPriority = document.querySelector('input[name="add_priority"]:checked');

  myList.add( addProject.getAttribute("data-project"),
              addTitle.value,
              addDetail.value,
              addDue.value,
              addPriority.value)
}

const editList = () => {
  const editId = document.getElementById('editId');
  const editTitle = document.getElementById('editTitle');
  const editDetail = document.getElementById('editDetail');
  const editDue = document.getElementById('editDue');
  const editPriority = document.querySelector('input[name="edit_priority"]:checked');

  myList.update(editId.value,
                editTitle.value,
                editDetail.value,
                editDue.value,
                editPriority.value)
}

const myList = createList();

export { createList, addToList, myList, editList }
