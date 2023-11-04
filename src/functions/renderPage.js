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
  
    const input = document.createElement('input');
    input.classList.add('toggle');
    input.setAttribute('type', 'checkbox');
    wrapper.append(input);
  
    const label = document.createElement('label');
    label.textContent = title;
    wrapper.append(label);

    const deadLine = document.createElement('div');
    deadLine.textContent = dueDate;
    wrapper.append(dueDate);
  
    const button = document.createElement('button');
    button.classList.add('destroy');
    wrapper.append(button);
    button.addEventListener('click', removeItem);
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
