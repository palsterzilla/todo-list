import { myList } from "./todoFunctions";
import { format } from "date-fns";

const renderItem = (e) => {
  const element = e.target;
  const id = element.closest('li').getAttribute('data-id');

  if (element.hasAttribute('data-destroy')) {
    myList.delete(id);
    renderList();
    
  } else if (element.hasAttribute('data-toggle')) {
    myList.toggle(id);
    renderList();
    
  } else if (element.hasAttribute('data-details')) {
    toggleModal(e);
    renderDetailsModal(e);

  } else if (element.hasAttribute('data-edit')) {
    toggleModal(e);
    renderEditModal(e);
  
  }
}

const renderContent = (e) => {
  const element = e.target;

  if (element.id === 'navHome') {
    toggleActivePage(e);
    renderList();

  } else if (element.id === 'navToday') {
    toggleActivePage(e);
    renderList();

  } else if (element.id === 'navWeek') {
    toggleActivePage(e);
    renderList();

  }
}

const toggleActivePage = (e) => {
  const element = e.target;
  const activePage = document.querySelector('[class=active][data-activePage]');
  
  activePage.classList.toggle('active');
  element.classList.toggle('active');
}

const toggleModal = (e) => {
  const hiddenOverlay = document.getElementById('overlay');
  const addModal = document.getElementById('addModal');
  const detailsModal = document.getElementById('detailsModal');
  const editModal = document.getElementById('editModal');
  const element = e.target;

  if (element.id === 'showAdd' ||
      element.id === 'closeAdd' ||
      element.id === 'addForm') {
        addModal.classList.toggle('hidden');
  } 
  
  else if ( element.hasAttribute('data-details') ||
            element.id === 'closeDetails') {
              detailsModal.classList.toggle('hidden');
  } 

  else if ( element.hasAttribute('data-edit') ||
            element.id === 'closeEdit' ||
            element.id === 'editForm') {
              editModal.classList.toggle('hidden');
  }

  hiddenOverlay.classList.toggle('hidden');
}

const renderList = () => {
  const activePage = document.querySelector('[class=active][data-activePage]');
  const defaultList = myList.read();
  const todayList = myList.readToday();
  const weekList = myList.readWeek();
  let items;
  
  if (activePage.textContent === 'Home') {
    items = defaultList;

  } else if (activePage.textContent === 'Today') {
    items = todayList;

  } else if (activePage.textContent === 'Week') {
    items = weekList;

  }

  const ul = document.getElementById('todoList');
  ul.innerHTML = '';

  items.forEach(item => {
    const id = item.id;
    const title = item.title;
    const due = item.due;
    const isDone = item.isDone;

    const li = document.createElement('li');
    // li.classList.add('list');
    li.setAttribute('data-id', id);
    ul.append(li);
  
    const wrapper = document.createElement('div');
    // wrapper.classList.add('view');
    li.append(wrapper);
  
    const isDoneCheck = document.createElement('input');
    // isDoneCheck.classList.add('toggle');
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
    // editButton.classList.add('edit');
    editButton.setAttribute('data-edit', '');
    editButton.textContent = 'EDIT';
    wrapper.append(editButton);

    const deleteButton = document.createElement('button');
    // deleteButton.classList.add('destroy');
    deleteButton.setAttribute('data-destroy', '');
    deleteButton.textContent = 'DELETE';
    wrapper.append(deleteButton);
  })
}

const renderDetailsModal = (e) => {
  const itemsList = myList.read()
  const element = e.target;
  const id = element.closest('li').getAttribute('data-id');
  
  itemsList.filter(item => {
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsProject = document.getElementById('detailsProject');
    const detailsPriority = document.getElementById('detailsPriority');
    const detailsDue = document.getElementById('detailsDue');
    const detailsDetails = document.getElementById('detailsDetails');

    if (item.id === id) {
      detailsTitle.textContent = item.title;
      detailsProject.children[1].textContent = null;
      detailsPriority.children[1].textContent = item.priority;
      detailsDue.children[1].textContent = format(new Date(item.due), 'MMMM do, yyyy');
      detailsDetails.children[1].textContent = item.detail;

    }
  })
}

const renderEditModal = (e) => {
  const itemsList = myList.read()
  const element = e.target;
  const id = element.closest('li').getAttribute('data-id');
  
  itemsList.filter(item => {
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

export { renderList, renderItem, renderContent, toggleModal };
