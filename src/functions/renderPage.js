import { myList } from "./todoFunctions";
import { format } from "date-fns";

const renderList = () => {
  const itemList = myList.read();
  const ul = document.getElementById('todoList');

  ul.innerHTML = '';

  itemList.forEach(item => {
    const id = item.id;
    const title = item.title;
    const due = item.due;
    const isDone = item.isDone;

    const li = document.createElement('li');
    // li.classList.add('list');
    li.setAttribute('data-id', id);
    ul.append(li);
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('view');
    li.append(wrapper);
  
    const isDoneCheck = document.createElement('input');
    isDoneCheck.classList.add('toggle');
    isDoneCheck.setAttribute('type', 'checkbox');
    isDoneCheck.setAttribute('data-toggle', '');
    isDoneCheck.checked = isDone;
    wrapper.append(isDoneCheck);
  
    const titleLabel = document.createElement('div');
    titleLabel.textContent = title;
    wrapper.append(titleLabel);

    const detailDiv = document.createElement('div');
    detailDiv.textContent = 'DETAILS';
    detailDiv.setAttribute('data-details', '');
    wrapper.append(detailDiv);

    const deadLine = document.createElement('div');
    deadLine.textContent = format(new Date(due), 'MMM do');
    wrapper.append(deadLine);
  
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.setAttribute('data-edit', '');
    editButton.textContent = 'EDIT';
    wrapper.append(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('destroy');
    deleteButton.setAttribute('data-destroy', '');
    deleteButton.textContent = 'DELETE';
    wrapper.append(deleteButton);
  })
}

const renderItem = (e) => {
  const element = e.target;
  const id = +element.closest('li').getAttribute('data-id');
  
  if (element.hasAttribute('data-destroy')) {
    myList.delete(id);
    renderList();
    
  } else if (element.hasAttribute('data-toggle')) {
    myList.toggle(id);
    renderList();
    
  } else if (element.hasAttribute('data-details')) {
    toggleModal();
    renderModal(e);

  } else if (element.hasAttribute('data-edit')) {
    toggleEditModal();
    renderEditModal(e);
  
  }
}

const toggleModal = () => {
  const hiddensElm = document.querySelectorAll('[data-hidden]');

  hiddensElm.forEach(elm => {
    elm.classList.toggle('hidden');
  })
}

const renderModal = (e) => {
  const element = e.target;
  const id = +element.closest('li').getAttribute('data-id');
  const itemList = myList.read();
  
  itemList.filter(item => {
    const popupTitle = document.getElementById('popupTitle');
    const popupProject = document.getElementById('popupProject');
    const popupPriority = document.getElementById('popupPriority');
    const popupDue = document.getElementById('popupDue');
    const popupDetails = document.getElementById('popupDetails');

    if (item.id === id) {
      popupTitle.textContent = item.title;
      popupProject.children[1].textContent = null;
      popupPriority.children[1].textContent = item.priority;
      popupDue.children[1].textContent = format(new Date(item.due), 'MMMM do, yyyy');
      popupDetails.children[1].textContent = item.detail;

    }
  })
}

const toggleEditModal = () => {
  const hiddensElm = document.querySelectorAll('[data-editModal]');
  
  hiddensElm.forEach(elm => {
    elm.classList.toggle('hidden');
  })
}

const renderEditModal = (e) => {
  const element = e.target;
  const id = +element.closest('li').getAttribute('data-id');
  const listItems = myList.read();
  
  listItems.filter(item => {
    if (item.id === id) {

      const editId = document.getElementById('editId');
      editId.value = id;

      const editTitle = document.getElementById('editTitle');
      editTitle.value = item.title;

      const editDetail = document.getElementById('editDetail');
      editDetail.value = item.detail;

      const editDue = document.getElementById('editDue');
      editDue.value = item.due;

      const priorityNode = document.querySelectorAll('input[name="edit_priority"]');
      const priorityArr = Array.from(priorityNode);
      priorityArr.find(elm => {
        if (elm.value === item.priority)
          elm.checked = true;
      })
    }
  })
}

export { renderList, renderItem, toggleModal, toggleEditModal };
