import store from './store';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';

//1. GET the api server state
//2. POST new bookmarks to the server
//3.UPDATE(PATCH) existing bookmarks in the server
//4.DELETE items in the sever

//function to run when fetching requests to handle status errors 
const bookmarkApiFetch = function(...args) {
  //declaring variable outside of the promise chain scope 
  let error;
  //our fetch statement and call 
  return fetch(...args)
    .then(res => {
      if(!res.ok){
        //if response is not 2xx, begin building error object
        error = {code: res.status};

        //if response is not JSON type, place statusType in error object and immediately reject promise
        if(!res.headers.get('content-type').includes('json')){
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      //otherwise, return parsed JSON
      return res.json();
    })
    .then(data => {
      //if an error exists, place the JSON message into the error object and reject the Promise with your error object so it lands in the next catch. 
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }
      //if no error, return the json as normal resolved Promise
      return data;
    });
};


//getItems will GET the api server state (api store) - WORKING!
const getItems = function(){
  let fetchCall = bookmarkApiFetch(`${BASE_URL}`);
  return fetchCall;
};

//createItem will add a new bookmark - WORKING!!
const createItem = function(bookmarkItem){
  let newBookmark = JSON.stringify(bookmarkItem);
  console.log(newBookmark);
  return bookmarkApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

//updateItem will 'patch' and update an existing bookmark
const updateItem = function(id, updateData){
  let updateDataStr = JSON.stringify(updateData);
  console.log(updateDataStr);
  
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: updateDataStr
  });
};

//deleteItem will remove a bookmark
const deleteItem = function(id){
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};