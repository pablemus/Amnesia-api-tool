import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'


// Render principal
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <HashRouter>
    <App />
  </HashRouter>
)

// Hot Reload (Webpack HMR)
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    root.render(
      <HashRouter>
        <NextApp />
      </HashRouter>
    )
  })
}
