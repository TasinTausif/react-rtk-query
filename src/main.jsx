import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import store from './app/store.js'
import { jsonPlaceholderApiSlice } from './services/jsonPlaceholderApiSlice.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Provider is dealing with local states that are available in the store */}
        <Provider store={store}>
            {/* To get access of the serverside states directly from the apiSlice */}
            {/* <ApiProvider api={jsonPlaceholderApiSlice}> */}
            <App />
            {/* </ApiProvider> */}
        </Provider>
    </StrictMode>,
)
