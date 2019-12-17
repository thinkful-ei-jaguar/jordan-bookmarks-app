import $ from 'jquery';

import store from './store.js';
import api from './api.js';

const generateModifyString = function(){
  return `
  <section class="modify">
    <button class="add-new">New Bookmark</button>
    <div class="filter-container">
      <label for="filter" class="filter">Filter
        <select class="filter-dropdown" name="filter" id="filter" onchange="">
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
  console.log(bookmark.rating, store.filter, bookmark.rating >= store.filter);
  if(bookmark.rating >= store.filter){
    if(!bookmark.expanded) { 
      return `
      <li class="bookmark-item-element" data-item-id="${bookmark.id}">
        <div class="item-element">
          <p class="title">${bookmark.title}</p>
          <p class="rating">${bookmark.rating}</p>
        </div>
      </li>`;
    } else {
      return `
      <li class="bookmark-item-element expanded" data-item-id="${bookmark.id}">
        <div class="item-element">
          <p class="title">${bookmark.title}</p>
          <p class="url-visit"><a href="${bookmark.url}" target="_blank">Visit Site</a></p>
          <p class="item-description">${bookmark.desc}</p>
          <div class="rating-given">${bookmark.rating}</div>
          <button type="button" class="delete-button">Delete Bookmark</button>
        </div>
      </li>`;
    }
  }
};

//this functio will join all generated html portions to render the whole list of exisiting bookmarks
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
      <p>Rating: </p>
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
      .then(res => res.json())
      .then((newItem) => {
        store.bookmarks.push(newItem);
        store.adding = false;
        render();
      });
  });
};

//this function will toggle the 'expanded' property for an item when clicked on 
const handleExistingItemClick = function(){
  $('main').on('click', '.title', function(){
    const id = getId(event.target);
    const currentItem = store.findById(id);
    
    const expanded = !currentItem.expanded; store.findAndUpdate(id, {expanded});
    
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
    console.log(event.target);
    
    const id = getId(event.target);
    api.deleteItem(id)
      .then(res => res.json())
      .then((item) => {
        store.findAndDelete(id);
        render();
      });
  });
};

//function will watch for filter selection to change
const handleFilterSelection = function(){
  $('main').on('change', '.filter-dropdown', function() {
    console.log('handleFilterSelection is firing');
    let currentFilter = $(event.target).val();
    // store.filterItems(currentFilter);
    store.filter = Number(currentFilter);
    render();
  });
  // render();
};

//this function will handle user clicking on the edit button
const handleEditClick = function(){
$().on('click', '', function(){
    editExistingItem();
  });
};

//this function will make the api call to update item after editting it
const editExistingItem = function(){
  // api.updateItem(id, {expanded: true})
  //   .then(res => res.json())
  //   .then((updatedItem) => {
  //     store.findAndUpdate(id, updatedItem);
  //     render();
  //   });
};

//rendering function
const render = function(){
  console.log('render function is firing!');
  if (store.adding) {
    return generateAddForm();
  }

  let bookmarkExist = store.bookmarks;
  const bookmarkString = generateItemString(bookmarkExist);
  $('main').html(bookmarkString);
};

const eventListeners = function(){
  handleNewClick();
  handleNewItemSave();
  handleExistingItemClick();
  handleDeleteClick();
  handleEditClick();
  handleFilterSelection();
};

export default {
  render, 
  eventListeners
};