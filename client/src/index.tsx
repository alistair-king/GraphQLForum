import React from 'react'
import ReactDOM from 'react-dom'

import 'froala-editor/js/plugins/align.min.js'

import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/css/plugins/code_view.min.css'

import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/css/plugins/image.min.css'

import 'froala-editor/js/plugins/lists.min.js'
import 'froala-editor/js/plugins/paragraph_format.min.js'
import 'froala-editor/js/plugins/quote.min.js'

import './styles/tailwind.css'
import './styles/froala_editor.min.css';

import { App } from './App'

ReactDOM.render(<App />, document.getElementById('root'))
