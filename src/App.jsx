import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Theme from './components/Theme'
import Result from './components/Result'
import Buttons from './components/Buttons'

function App() {
  const [displayValue, setDisplayValue] = useState('0')
  const [activeTheme, setActiveTheme] = useState('default')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default'
    setActiveTheme(savedTheme)
    document.body.className = savedTheme
  }, [])

  const toggleTheme = (theme) => {
    setActiveTheme(prev => {
      const newTheme = prev === theme ? 'default' : theme
      document.body.className = newTheme
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  return (
    <>
      <Theme 
        activeTheme={activeTheme}
        toggleTheme={toggleTheme}
      />
      <Result value={displayValue} />
      <Buttons onDisplayChange={setDisplayValue}/>
    </>
  )
}

export default App
