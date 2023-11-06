import { addToList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const preventClose = document.getElementById("preventClose");
const dialog = document.getElementById('addDialog');
const form = document.getElementById('taskForm');
const list = document.getElementById('todoList');
const modalWrapper = document.getElementById('modalWrapper');

showDialogBtn.addEventListener('click', () => {
  dialog.showModal();
});

preventClose.addEventListener('click', (e) => {
  e.stopPropagation();
});

['click', 'close'].forEach(evt =>
  dialog.addEventListener(evt, () => {
    form.reset();
    dialog.close();
  })
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addToList(myList);
  renderList();
  dialog.close();
});

list.addEventListener('click', (e) => {
  renderItem(e);
})

modalWrapper.addEventListener('click', (e) => {
  if (e.target.id === 'closeModal' || e.target.id === 'overlay') {
    toggleModal();
  }
})