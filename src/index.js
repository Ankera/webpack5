// // import './index.css';
// // import lodash from 'lodash';

// console.log('================================', isarray([]))
// const title = require('./title');
// import title from './title';

// console.log(title);

const btn = document.getElementById('btn');

btn.addEventListener('click', function () {
  import(/* webpackChunkName: "title" */'./title').then(data => {
    console.log(data)
  })
})