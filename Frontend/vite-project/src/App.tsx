import './App.css'
import Abstraction from './components/Abstraction'
import Footer from './components/Footer'
import Hero from './components/Hero'
import How_Works from './components/How_Works'
import Know_More from './components/Know_More'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <Know_More/>
      <Abstraction/>
      <How_Works/>
      <Footer/>
    </div>
  )
}

export default App