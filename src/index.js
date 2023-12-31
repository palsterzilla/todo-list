import { addToList, editList } from "./functions/todoFunctions.js";
import { renderProject, renderList, renderItem, renderContent, toggleModal } from "./functions/renderPage.js";
import 'normalize.css';
import './styles/common.css';
import './styles/modal.css';

const showDialogBtn = document.getElementById('showAdd');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const closeButtons = document.querySelectorAll('#closeAdd, #closeDetails, #closeEdit');
const sidebar = document.getElementById('sidebar');

showDialogBtn.addEventListener('click', (e) => {
  toggleModal(e);
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToList()
  addForm.reset();
  renderList();
  toggleModal(e);
});

dynamicLists.addEventListener('click', (e) => {
  renderItem(e);
})

closeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    toggleModal(e);
  })
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList();
  editForm.reset();
  renderList();
  toggleModal(e);
})

sidebar.addEventListener('click', (e) => {
  renderContent(e);
})

document.addEventListener('DOMContentLoaded', () => {
  renderList();
  renderProject();
});