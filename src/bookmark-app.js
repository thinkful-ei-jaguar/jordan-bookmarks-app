import $ from 'jquery';

import store from './store.js';

//this function will generate the bookmark element
const generateItemElement = function(bookmark){
  if(!bookmark.expanded) { 
    return `
    <li class="bookmark-item-element" data-item-id="${bookmark.id}">
      <div class="item-condensed">
        <p class="title">${bookmark.title}</p>
        <p class="rating">${bookmark.rating}</p>
      </div>
    </li>`;
  } else {
    return `
    <li class="bookmark-item-element" data-item-id="${bookmark.id}">
      <div class="item-expanded">
        <p class="title">${bookmark.title}</p>
        <p class="url-visit"><a href="${bookmark.url}">Visit Site</a></p>
        <p class="item-description">${bookmark.description}</p>
        <div class="rating-given">${bookmark.rating}</div>
        <button type="button" class="delete-button">Delete Bookmark</button>
      </div>
    </li>`;
  }
};

//this functio will join all generated html portions to render the whole list of exisiting bookmarks
const generateItemString = function(bookmarkList){
  const bookmarks = bookmarkList.map((item) => generateItemElement(item));
  return bookmarks.join('');
};

//this function will generate the form to add a new bookmark after clicking on the add new button 
const generateAddForm = function(){
  let addingForm =  `
  <section class="add-container">
  <form>
    <h2>Create new bookmark:</h2>
    <label for="bookmark-title" class="add-label">Title
      <input type="text" id="bookmark-title" name="title" class="bookmark-title-input" required>
    </label>
    <label for="url" class="add-label">Url
      <input type="text" id="url" name="url" required>
    </label>
    <label for="description" class="add-label">Bookmark Description
      <input type="text" id="description" name="description">
    </label>
    <div class="stars-picker">
      <span name="star" id="star1" class="star"></span>
      <span name="star" id="star2" class="star"></span>
      <span name="star" id="star3" class="star"></span>
      <span name="star" id="star4" class="star"></span>
      <span name="star" id="star5" class="star"></span>
    </div>
    <div class="cancel-add">
      <button type="button" class="cancel-button">Cancel</button>
      <button type="button" class="save-button">Save</button>
    </div>
  </form>
  </section>`;

  $('.modify').html(addingForm);
};

//function to handle when user clicks on the add new bookmark button
const handleNewClick = function(){
$('.modify').on('click', '.add-new', function(event) {
    event.preventDefault();
    console.log('Add new bookmark clicked!');
    store.store.adding = true;
    render();
  });
};

//rendering function
const render = function(){
  console.log('render function is firing!');
  if (store.store.adding) {
    return generateAddForm();
  }
  let bookmarkExist = store.store.bookmarks;
  const bookmarkString = generateItemString(bookmarkExist);
  $('.existing-bookmarks').html(bookmarkString);
  
};

const eventListeners = function(){
  handleNewClick();
};

export default {
  render, 
  eventListeners
};