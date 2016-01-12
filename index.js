// Babel polyfill must be imported before sagas
import 'babel-polyfill'
// React imports
import React from 'react'
import { render } from 'react-dom'

// App specific imports
import history from './services/history'
import routes from './routes'

render(
    <Router>{routes}</Router>,
    document.getElementById('root')
);
