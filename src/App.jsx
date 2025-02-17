import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import WeatherApp from './components/weatherapp/WeatherApp'
import Footer from './components/Footer'



function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='weather' element={<WeatherApp/>}/>
       </Routes> 
       <Footer/>
    </BrowserRouter>
  )
}

export default App
