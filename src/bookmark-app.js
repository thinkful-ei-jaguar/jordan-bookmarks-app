import $ from 'jquery';

import store from './store.js';
import api from './api.js';

const generateModifyString = function(){
  return `
  <section class="modify">
    <button class="add-new"><span class="fa fas fa-plus"></span> New</button>
    <div class="filter-container">
      <label for="filter" class="filter"><span>Filter by <span class="fa fas fa-filter"></span></span>
        <select class="filter-dropdown" name="filter" id="filter">
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </label>
    </div>
  </section>
  <ul class="item-view existing-bookmarks">
  </ul>
  `;
};

//this function will generate the bookmark element
const generateItemElement = function(bookmark){
  //console.log(bookmark.rating, store.filter, bookmark.rating >= store.filter);
  if(bookmark.rating >= store.filter){
    if(!bookmark.expanded) { 
      return `
      <li class="bookmark-item-element" data-item-id="${bookmark.id}">
        <div class="item-element">
          <p class="title">${bookmark.title}</p>
          <p class="rating">${bookmark.rating} <span class="fa fas fa-star"></span></p>
        </div>
      </li>`;
    } else {
      return `
      <li class="bookmark-item-element " data-item-id="${bookmark.id}">
        <div class="item-element expanded">
          <div class="title-url">
          <p class="title">${bookmark.title}</p>
          <p class="url-visit"><a href="${bookmark.url}" target="_blank"><span>Visit site   <span class="fa fas fa-external-link-alt"></span></span></a></p>
          </div>
          <p class="item-description"><strong>Description:</strong><br> ${bookmark.desc}</p>
          <div class="rating-given"><strong>Rated:</strong><br>${bookmark.rating} <span class="fa fas fa-star"></span></div>
          <button type="button" class="delete-button"><i class="fa fas fa-trash"></i></button>
          <button class="edit-button"> <span class="fa fas fa-pen"></span> Edit</button>
        </div>
      </li>`;
    }
  }
};

//this function will join all generated html portions to render the whole list of exisiting bookmarks
const generateItemString = function(bookmarkList){
  const bookmarks = bookmarkList.map((item) => generateItemElement(item));
  const modifySection = generateModifyString();
  return modifySection + bookmarks.join('');
};

//this function will generate the form to add a new bookmark after clicking on the add new button 
const generateAddForm = function(){
  let addingForm =  `
  <section class="add-container">
  <form class="add-new-bookmark">
    <h2>Create new bookmark:</h2>
    <label for="bookmark-title" class="add-label">Title
      <input type="text" id="bookmark-title" name="title" class="bookmark-title-input" required>
    </label>
    <label for="url" class="add-label">Url
      <input type="url" id="url" name="url" class="url-input" required>
    </label>
    <label for="description" class="add-label">Bookmark Description
      <input type="text" id="description" name="description" class="description-input" required>
    </label>
    <div class="stars-picker">
      <p>Rate this bookmark: </p>
      <input name="star" id="star1" type="radio" value="1"></input>
      <label for="star1">1</label>
      <input name="star" id="star2" type="radio" value="2"></input>
      <label for="star2">2</label>
      <input name="star" id="star3" type="radio" value="3"></input>
      <label for="star3">3</label>
      <input name="star" id="star4" type="radio" value="4"></input>
      <label for="star4">4</label>
      <input name="star" id="star5" type="radio" value="5"></input>
      <label for="star5">5</label>
  </div>
    <div class="cancel-add">
      <button type="reset" class="cancel-button">Cancel</button>
      <button type="submit" class="save-button">Save</button>
    </div>
  </form>
  </section>`;

  $('.modify').html(addingForm);
};

//function generate the edit form();
const generateEditForm = function(currentItem){
  const editForm = `
  <section class="edit-container">
  <form class="edit-bookmark">
    <h2>Edit it:</h2>
    <label for="bookmark-title" class="add-label edit-item-id">Title
      <input type="text" id="bookmark-title" name="title" class="bookmark-title-input" value="${currentItem.title}" required>
    </label>
    <label for="url" class="add-label">Url
      <input type="url" id="url" name="url" class="url-input" value="${currentItem.url}" required>
    </label>
    <label for="description" class="add-label">Bookmark Description
      <input type="text" id="description" name="description" class="description-input" value="${currentItem.desc}" required>
    </label>
    <div class="stars-picker" value="${currentItem.rating}">
      <p>Rate this bookmark: </p>
      <input name="star" id="star1" type="radio" value="1" checked=${currentItem.rating === 1}></input>
      <label for="star1">1</label>
      <input name="star" id="star2" type="radio" value="2" checked=${currentItem.rating === 2}></input>
      <label for="star2">2</label>
      <input name="star" id="star3" type="radio" value="3" checked=${currentItem.rating === 3}></input>
      <label for="star3">3</label>
      <input name="star" id="star4" type="radio" value="4" checked=${currentItem.rating === 4}></input>
      <label for="star4">4</label>
      <input name="star" id="star5" type="radio" value="5" checked=${currentItem.rating === 5}></input>
      <label for="star5">5</label>
  </div>
    <div class="cancel-add">
      <button type="reset" class="edit-cancel-button">Cancel</button>
      <button type="submit" class="edit-save-button">Save</button>
    </div>
  </form>
  </section>
  `;
  $('main').html(editForm);
};

//function to handle when user clicks on the add new bookmark button
const handleNewClick = function(){
$('main').on('click', '.add-new', function(event) {
    event.preventDefault();
    store.adding = true;
    render();
  });
};

//this function will handle clicking the save button for submitting a new bookmark item 
const handleNewItemSave = function(){
  $('main').on('submit', '.add-new-bookmark', function(event){
    event.preventDefault();
    
    let newTitle = $('.bookmark-title-input').val();
    let newUrl = $('.url-input').val();
    let newDescription = $('.description-input').val();
    let newRating =  $('input:radio[name=star]:checked').val();

    const newBookmarkEntry = {
      title : newTitle,
      url: newUrl,
      rating: newRating,
      desc: newDescription,
    };

    api.createItem(newBookmarkEntry)
      // .then(res => res.json())
      .then((newItem) => {
        store.bookmarks.push(newItem);
        store.adding = false;
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
      });
  });
};

//this function will handle when the user clicks on the cancel button when adding a form 
const handleCancelFormClick = function(){
  $('main').on('click','.cancel-button', function (){
    store.adding = false;
    render();
  });
};

const handleEditCancel = function(){
  $('main').on('click','.edit-cancel-button', function (){
    store.editing = false;
    render();
  });
};

//this function will toggle the 'expanded' property for an item when clicked on 
const handleExistingItemClick = function(){
  $('main').on('click', '.title', function(){
    const id = getId(event.target);
    const currentItem = store.findById(id);
  
    const expanded = !currentItem.expanded; 
    store.findAndUpdate(id, {expanded});
    
    render();
  });
};

//function to get id from element -> to use in edit and delete functions
const getId = function(item){
  return $(item)
    .closest('.bookmark-item-element')
    .data('item-id');
};

//this function will handle when user clicks to delete an existing bookmark
const handleDeleteClick = function(){
  $('main').on('click', '.delete-button', function(){
    const id = getId(event.target);
    api.deleteItem(id)
      // .then(res => res.json())
      .then((item) => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
      });
  });
};

//function will watch for filter selection to change
const handleFilterSelection = function(){
  $('main').on('change', '.filter-dropdown', function() {
    let currentFilter = $(event.target).val();
    store.filter = Number(currentFilter);
    render();
  });
};

//this function will handle user clicking on the edit button
const handleEditClick = function(){
  $('main').on('click', '.edit-button', function(){
    const editId = getId(event.target);
    store.editingId = editId;
    const currentItem = store.findById(editId);
    store.editing = true;
    render(currentItem);
  });
};

//this function will handle the submit of th edit form 
const handleEditSave = function(){
  $('main').on('submit', '.edit-bookmark', function(event){
    event.preventDefault();
    store.editing = false;
    let editId = store.editingId;
    let newTitle = $('.bookmark-title-input').val();
    let newUrl = $('.url-input').val();
    let newDescription = $('.description-input').val();
    let newRating =  $('input:radio[name=star]:checked').val();

    const editBookmarkEntry = {
      title : newTitle,
      url: newUrl,
      rating: newRating,
      desc: newDescription,
    };

    api.updateItem(editId, editBookmarkEntry)
      // .then(res => res.json())
      .then((updatedItem) => {
        store.findAndUpdate(editId, updatedItem);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
      });
  });
  render();
  
};

//will generate the html for an error message to be displayed 
const generateError = function(message){
  return `
    <section class="error-container">
      <button id="cancel-error">X</button>
      <p>${message}</p>
    </section>
  `;
};

//will handle closing the error message 
const handleErrorClose = function(){
  $('.error-container').on('click', '.cancel-error', function(){
    store.setError(null);
    render();
  });
};

//rendering function
const render = function(currentItem){
  let bookmarkExist = store.bookmarks;
  const bookmarkString = generateItemString(bookmarkExist);

  if (store.adding) {
    return generateAddForm();
  }

  if (store.editing) {
    return generateEditForm(currentItem);
  } else {
    $('main').html(bookmarkString);
  }

  if (store.error){
    const err = generateError(store.error);
    $('.error-container').html(err);
  } else {
    $('.error-container').empty(); 
  }
};

const eventListeners = function(){
  handleNewClick();
  handleNewItemSave();
  handleExistingItemClick();
  handleDeleteClick();
  handleEditClick();
  handleFilterSelection();
  handleCancelFormClick();
  handleErrorClose();
  handleEditSave();
  handleEditCancel();
};

export default {
  render, 
  eventListeners
};