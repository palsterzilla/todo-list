import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showAdd');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const closeButtons = document.querySelectorAll('#closeAdd, #closeDetails, #closeEdit');

showDialogBtn.addEventListener('click', (e) => {
  toggleModal(e);
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToList(myList);
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
  editList(myList);
  editForm.reset();
  renderList();
  toggleModal(e);
})
