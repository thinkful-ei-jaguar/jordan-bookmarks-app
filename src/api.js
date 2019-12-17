//import statements 

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';

//1. GET the api server state
//2. POST new bookmarks to the server
//3.UPDATE(PATCH) existing bookmarks in the server
//4.DELETE items in the sever

//getItems will GET the api server state (api store) - WORKING!
const getItems = function(){
  let fetchCall = fetch(`${BASE_URL}`);
  return fetchCall;
};

//createItem will add a new bookmark - WORKING!!
const createItem = function(bookmarkItem){
  let newBookmark = JSON.stringify(bookmarkItem);
  console.log(newBookmark);
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

//updateItem will 'patch' and update an existing bookmark
const updateItem = function(id, updateData){
  let updateDataStr = JSON.stringify(updateData);
  console.log(updateDataStr);
  
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