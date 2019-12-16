import $ from 'jquery';

import store from './store.js';
import api from './api.js';

//this function will generate the bookmark element
const generateItemElement = function(bookmark){
  if(!bookmark.expanded) { 
    return `
    <li class="bookmark-item-element" data-item-id="${bookmark.id}">
      <div class="item-condensed item-element">
        <p class="title">${bookmark.title}</p>
        <p class="rating">${bookmark.rating}</p>
      </div>
    </li>`;
  } else {
    return `
    <li class="bookmark-item-element" data-item-id="${bookmark.id}">
      <div class="item-expanded item-element">
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
      <span name="star" id="star1" class="star"></span>
      <span name="star" id="star2" class="star"></span>
      <span name="star" id="star3" class="star"></span>
      <span name="star" id="star4" class="star"></span>
      <span name="star" id="star5" class="star"></span>
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
$('.modify').on('click', '.add-new', function(event) {
    event.preventDefault();
    console.log('Add new bookmark clicked!');
    store.adding = true;
    render();
  });
};

//this function will handle clicking the save button for submitting a new bookmark item 
const handleNewItemSave = function(){
  $('.modify').on('submit', '.add-new-bookmark', function(event){
    event.preventDefault();
    console.log('save add new button firing!');
    
    let newTitle = $('.bookmark-title-input').val();
    let newUrl = $('.url-input').val();
    let newDescription = $('.description-input').val();
    // let newRating = 


    const newBookmarkEntry = {
      title : newTitle,
      url: newUrl,
      //hardcoded rating before I get 
      rating: 5,
      desc: newDescription
    };

    api.createItem(newBookmarkEntry)
      .then(res => res.json())
      .then((newItem) => {
        store.addItem(newItem);
        render();
      });
  });
};

//this function will toggle the 'expanded' property for an item when clicked on 
const handleItemClick = function(){
  $('.existing-bookmarks').on('click', '.item-element', function(){
    store.adding = false;
    const id = getId(event.target);
    api.updateItem(id, {expanded: true})
      .then(res => res.json())
      .then((updatedItem) => {
        store.findAndUpdate(id, updatedItem);
        render();
      });
  });
};

//function to get id from element -> to use in edit and delete functions
const getId = function(item){
  return $(item)
    .closest('.bookmark-item-element')
    .data('item-id');
};

//rendering function
const render = function(){
  console.log('render function is firing!');
  if (store.adding) {
    return generateAddForm();
  }
  let bookmarkExist = store.bookmarks;
  const bookmarkString = generateItemString(bookmarkExist);
  $('.existing-bookmarks').html(bookmarkString);
};

const eventListeners = function(){
  handleNewClick();
  handleNewItemSave();
  handleItemClick();
};

export default {
  render, 
  eventListeners
};