import { addToList, editList, myList } from "./functions/todoFunctions.js";
import { renderList, renderItem, toggleAddModal, toggleDetailsModal, toggleEditModal } from "./functions/renderPage.js";
import './styles/modal.css';

const showDialogBtn = document.getElementById('showDialog');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const dynamicLists = document.getElementById('todoList');
const closeButtons = document.querySelectorAll('#closeAdd, #closeDetails, #closeEdit');

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

closeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const elm = e.target;
    
    if (elm.id === 'closeAdd') {
      toggleAddModal();

    } else if (elm.id === 'closeDetails') {
      toggleDetailsModal();

    } else if (elm.id === 'closeEdit') {
      toggleEditModal();

    }
  })
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  editList(myList);
  editForm.reset();
  renderList();
  toggleEditModal();
})
