import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleAddModal, toggleDetailsModal, toggleEditModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const closeDetailsBtn = document.getElementById('closeDetails');
const closeAddBtn = document.getElementById('closeAdd');

showDialogBtn.addEventListener('click', () => {
  toggleAddModal();
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToList(myList);
  addForm.reset();
  renderList();
  toggleAddModal();
});

dynamicLists.addEventListener('click', (e) => {
  renderItem(e);
})

closeDetailsBtn.addEventListener('click', () => {
  toggleDetailsModal();
})

closeAddBtn.addEventListener('click', () => {
  toggleAddModal();
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList(myList);
  editForm.reset();
  renderList();
  toggleEditModal();
})
