//import statements 
import $ from 'jquery';

import './index.css';

import bookmarkApp from './bookmark-app.js';

const main = function(){
  bookmarkApp.eventListeners();
  bookmarkApp.render();
};

$(main);