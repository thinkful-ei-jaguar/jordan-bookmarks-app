const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const addItem = function(newItem){
  this.bookmarks.push(newItem);
};

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


export default {
  bookmarks,
  adding,
  error,
  filter,
  addItem,
  findById,
  findAndUpdate,
  findAndDelete,
  filterItems
};