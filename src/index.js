import './style.css'
import javascriptLogo from './javascript.svg'
import webpackLogo from './webpack.svg'
import { setupCounter } from './counter.js'

document.querySelector('#root').innerHTML = `
  <div>
    <a href="https://www.webpackjs.com/" target="_blank">
      <img src="${webpackLogo}" class="logo" alt="webpack logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Webpack + JS!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Webpack logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
