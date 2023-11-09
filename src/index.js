import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleDetailsModal, toggleEditModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const preventClose = document.getElementById("preventClose");
const addTaskDialog = document.getElementById('addDialog');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const detailsModal = document.getElementById('detailsModal');

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

detailsModal.addEventListener('click', (e) => {
  if (e.target.id === 'closeDetails' || e.target.id === 'overlay') {
    toggleDetailsModal();
  }
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList(myList);
  editForm.reset();
  renderList();
  toggleEditModal();
})