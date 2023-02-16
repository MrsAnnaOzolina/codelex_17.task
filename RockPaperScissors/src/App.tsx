import { useState, Suspense } from 'react'
import NavList from './components/NavList';
import { Routes, Route } from "react-router-dom";
import Game from "./components/game"
import Home from './components/home'
import Statistic from './components/statistic';



function App() {


  return (
    <div>
      <Suspense fallback={null}>
    <NavList/>
   <Routes>
       <Route path="/" 
        element={<Home /> }
       />
       <Route  path="game/" 
        element={<Game />}
        />
      
       <Route  path="statistic/" 
        element={<Statistic />} 
       />
   </Routes>
 </Suspense>
   </div>
  )
}

export default App
