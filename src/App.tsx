import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './components/sandwich_display__page'

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
