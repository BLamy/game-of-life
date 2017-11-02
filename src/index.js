import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { injectGlobal } from 'styled-components'
import './view/antd.css'

injectGlobal`
html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;        
    background-color: #f2f2f2;
}
`

ReactDOM.render(<App />, document.getElementById('root'));
