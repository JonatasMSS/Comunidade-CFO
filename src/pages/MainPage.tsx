import { useState } from 'react'
import '../styles/global.css';
import MainFoto from '../assets/Principal.jpg';
function App() {


  return (
    <div className='w-screen h-screen bg-black flex'>
      <div className=' w-full flex flex-col gap-5 p-2 text-white font-K2D justify-center items-center '>
        <h2 className='font-bold text-6xl text-left  '>Bem vindo a CFO Brasil!</h2>
        <span className='font-bold text-left text-xl'>A Comunidade First e OBR Brasileira para divulgação de dúvidas e descobertas!</span>
      </div>
      <img src={MainFoto} alt="Foto principal" className='w-1/2' />
    </div>
  )
}

export default App
