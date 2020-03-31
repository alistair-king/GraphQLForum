import React from 'react'
import ReactDOM from 'react-dom'

import './styles/tailwind.css'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
// import 'font-awesome/css/font-awesome.css';

import { App } from './App'

ReactDOM.render(<App />, document.getElementById('root'))
