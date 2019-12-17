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
    // .then(res => res.json())
    .then((items)=> {
      items.forEach((item) => bookmarks.push(item));
      bookmarkApp.render();
    });
};

//function to set error variable to an error if one exists 
const setError = function(error){
  this.error = error;
};

// const filterItems = function(minRating){
//   // bookmarks = [];
//   // apiGetItems();
//   filter = Number(minRating);
//   // console.log(filter);
//   // console.log(bookmarks.length + 'xo');
//   // bookmarks = bookmarks.filter(currentItem => currentItem.rating >= filter);
//   console.log(filter, typeof filter)
//   bookmarkApp.render(); 
// };


export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  findAndUpdate,
  findAndDelete,
  setError,
  apiGetItems
};