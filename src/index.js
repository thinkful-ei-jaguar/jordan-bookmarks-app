//import statements 
import $ from 'jquery';

import api from './api.js';
import store from './store.js';

import './index.css';

import bookmarkApp from './bookmark-app.js';

const main = function(){
  store.apiGetItems();  
  // bookmarkApp.render();
  bookmarkApp.eventListeners();
};
$(main);