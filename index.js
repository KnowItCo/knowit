// Babel polyfill must be imported before other packages
import 'babel-polyfill'
// React imports
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'

// App specific imports
import routes from './routes'

render(
    <Router>{routes}</Router>,
    document.getElementById('root')
);
