import {state} from './store';
import * as mobx from 'mobx';

const target = document.getElementById('main');

console.log('main target', target);

mobx.autorun(() => {
  target.innerText = state.counter;
});

setInterval(() => {
  state.counter = state.counter + 1;
}, 1000);

