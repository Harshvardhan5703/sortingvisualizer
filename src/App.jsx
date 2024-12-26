import { useState } from 'react'
import './App.css'
import SortVisualizer from './components/SortVisualizer'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App  w-full dark  h-[100%]">
     
         <main className='flex flex-col  h-screen'>         
          <SortVisualizer />         
          </main>
          <Footer/>
    </div>
  )
}

export default App
