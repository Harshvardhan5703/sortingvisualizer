import { useState } from 'react'
import './App.css'
import SortVisualizer from './components/SortVisualizer'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App  w-full dark flex flex-col-reverse  h-[100%]">
     
         <main className='flex-1 flex-grow flex-col  h-screen'>         
          <SortVisualizer />         
          </main>
          <Footer/>
    </div>
  )
}

export default App
