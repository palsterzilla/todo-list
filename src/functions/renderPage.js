import { createList } from "./todoFunctions";

const myList = createList();

const updatePage = () => {
  const itemList = myList.read();
  const ul = document.getElementById('todoList');

  ul.innerHTML = '';

  itemList.forEach(item => {
    const id = item.id;
    const title = item.title;

    const li = document.createElement('li');
    // li.classList.add('list');
    li.setAttribute('data-id', id);
    ul.append(li);
  
    const div = document.createElement('div');
    div.classList.add('view');
    li.append(div);
  
    const input = document.createElement('input');
    input.classList.add('toggle');
    input.setAttribute('type', 'checkbox');
    div.append(input);
  
    const label = document.createElement('label');
    label.textContent = title;
    div.append(label);
  
    const button = document.createElement('button');
    button.classList.add('destroy');
    div.append(button);
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

export { myList, updatePage };
