import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleAddModal, toggleDetailsModal, toggleEditModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const closeAddBtn = document.getElementById('closeAdd');
const closeDetailsBtn = document.getElementById('closeDetails');
const closeEditBtn = document.getElementById('closeEdit');

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

closeAddBtn.addEventListener('click', () => {
  toggleAddModal();
})

closeDetailsBtn.addEventListener('click', () => {
  toggleDetailsModal();
})

closeEditBtn.addEventListener('click', () => {
  toggleEditModal();
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList(myList);
  editForm.reset();
  renderList();
  toggleEditModal();
})
