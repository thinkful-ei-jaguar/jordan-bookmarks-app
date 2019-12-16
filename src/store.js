const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: true
  },
];
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
  const newObject = Object.assign(currentItem, newData);
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  addItem,
  findById,
  findAndUpdate
};