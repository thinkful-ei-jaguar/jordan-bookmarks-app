import bookmarkApp from './bookmark-app.js';
import api from './api.js';
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

// const addItem = function(newItem){
//   this.bookmarks.push(newItem);
// };

const findById = function(id){
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const findAndUpdate = function(id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const apiGetItems =function(){
  api.getItems()
    .then(res => res.json())
    .then((items)=> {
      items.forEach((item) => bookmarks.push(item));
      bookmarkApp.render();
    });
};

const filterItems = function(minRating){
  bookmarks = [];
  apiGetItems();
  filter = minRating;
  console.log(filter);
  console.log(bookmarks.length + 'xo');
  bookmarks = this.bookmarks.filter(currentItem => currentItem.rating >= filter);
  bookmarkApp.render();
  
};


export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  findAndUpdate,
  findAndDelete,
  filterItems,
  apiGetItems
};