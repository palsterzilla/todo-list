import { myList } from "./todoFunctions";
import { format } from "date-fns";

const updatePage = () => {
  const itemList = myList.read();
  const ul = document.getElementById('todoList');

  ul.innerHTML = '';

  itemList.forEach(item => {
    const id = item.id;
    const title = item.title;
    const dueDate = item.dueDate;
    const isDone = item.isDone;

    const li = document.createElement('li');
    // li.classList.add('list');
    li.setAttribute('data-id', id);
    ul.append(li);
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('view');
    li.append(wrapper);
  
    const isDoneCheck = document.createElement('input');
    isDoneCheck.classList.add('toggle');
    isDoneCheck.setAttribute('type', 'checkbox');
    isDoneCheck.checked = isDone;
    isDoneCheck.addEventListener('click', toggleItem);
    wrapper.append(isDoneCheck);
  
    const titleLabel = document.createElement('label');
    titleLabel.textContent = title;
    wrapper.append(titleLabel);

    const deadLine = document.createElement('div');
    deadLine.textContent = format(new Date(dueDate), 'MMM do');
    wrapper.append(deadLine);
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('destroy');
    deleteButton.addEventListener('click', removeItem);
    wrapper.append(deleteButton);
  })
}

const removeItem = (e) => {
  const el = e.target;
  const li = el.parentNode.parentNode;
  const id = +li.getAttribute('data-id');

  myList.delete(id);
  updatePage();
}

const toggleItem = (e) => {
  const el = e.target;
  const li = el.parentNode.parentNode;
  const id = +li.getAttribute('data-id');

  myList.toggle(id);
  updatePage();
}

export { updatePage };
