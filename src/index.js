import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleModal, toggleEditModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const preventClose = document.getElementById("preventClose");
const addTaskDialog = document.getElementById('addDialog');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const modalWrapper = document.getElementById('modalWrapper');

showDialogBtn.addEventListener('click', () => {
  addTaskDialog.showModal();
});

preventClose.addEventListener('click', (e) => {
  e.stopPropagation();
});

['click', 'close'].forEach(evt =>
  addTaskDialog.addEventListener(evt, () => {
    addForm.reset();
    addTaskDialog.close();
  })
);

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToList(myList);
  renderList();
  addTaskDialog.close();
});

dynamicLists.addEventListener('click', (e) => {
  renderItem(e);
})

modalWrapper.addEventListener('click', (e) => {
  if (e.target.id === 'closeModal' || e.target.id === 'overlay') {
    toggleModal();
  }
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList(myList);
  editForm.reset();
  renderList();
  toggleEditModal();
})