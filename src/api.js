//import statements 

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Jordan/bookmarks';

//1. GET the api server state
//2. POST new bookmarks to the server
//3.UPDATE(PATCH) existing bookmarks in the server
//4.DELETE items in the sever

//getItems will GET the api server state (api store)
const getItems = function(){
  return fetch(`${BASE_URL}`);
};

//createItem will add a new bookmark
const createItem = function(name){
  let newBookmark = JSON.stringify({name});
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

//updateItem will 'patch' and existing bookmark
const updateItem = function(id, updateData){
  let updateDataStr = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: updateDataStr
  });
};

//deleteItem will remove a bookmark
const deleteItem = function(id){
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};