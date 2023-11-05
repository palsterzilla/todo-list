import { myList } from "./todoFunctions";
import { format } from "date-fns";

const renderList = () => {
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
    isDoneCheck.setAttribute('data-toggle', '');
    isDoneCheck.checked = isDone;
    wrapper.append(isDoneCheck);
  
    const titleLabel = document.createElement('div');
    titleLabel.textContent = title;
    wrapper.append(titleLabel);

    const detailDiv = document.createElement('div');
    detailDiv.textContent = 'DETAILS';
    wrapper.append(detailDiv);

    const deadLine = document.createElement('div');
    deadLine.textContent = format(new Date(dueDate), 'MMM do');
    wrapper.append(deadLine);
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('destroy');
    deleteButton.setAttribute('data-destroy', '');
    wrapper.append(deleteButton);
  })
}

const renderItem = (e) => {
  const element = e.target;
  const id = +element.closest('li').getAttribute('data-id');
  
  if (element.hasAttribute('data-destroy')) {
    myList.delete(id);
    renderList();
    
  } else if (element.hasAttribute('data-toggle')) {
    myList.toggle(id);
    renderList();
    
  }
}

export { renderList, renderItem };
