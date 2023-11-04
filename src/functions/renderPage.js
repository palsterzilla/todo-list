import { myList } from "./todoFunctions";

const updatePage = () => {
  const itemList = myList.read();
  const ul = document.getElementById('todoList');

  ul.innerHTML = '';

  itemList.forEach(item => {
    const id = item.id;
    const title = item.title;
    const dueDate = item.dueDate;

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
    wrapper.append(isDoneCheck);
  
    const titleLabel = document.createElement('label');
    titleLabel.textContent = title;
    wrapper.append(titleLabel);

    const deadLine = document.createElement('div');
    deadLine.textContent = dueDate;
    wrapper.append(dueDate);
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('destroy');
    wrapper.append(deleteButton);
    deleteButton.addEventListener('click', removeItem);
  })
}

const removeItem = (e) => {
  const el = e.target;
  const li = el.parentNode.parentNode;
  const id = +li.getAttribute('data-id');

  li.remove();
  myList.delete(id);
  updatePage();
}

export { updatePage };
