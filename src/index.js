//import statements 
import $ from 'jquery';

import api from './api.js';
import store from './store.js';

import './index.css';

import bookmarkApp from './bookmark-app.js';

const main = function(){
  api.getItems()
    .then(res => res.json())
    .then((items)=> {
      items.forEach((item) => store.addItem(item));
      bookmarkApp.render();
    });
  bookmarkApp.eventListeners();
  bookmarkApp.render();
};
$(main);