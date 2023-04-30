import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { store } from './app/store'
import App from './App'
import './index.css'

const container = document.getElementById('root')
if (!(container instanceof HTMLElement)) {
  throw new Error('container is not HTMLElement')
}

const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
