import React, { useEffect } from 'react'
import logo from './assets/11.png'
import Desc from './Desc';
import './App.less';

//@ts-ignore
console.log('NODE_ENV===============', process.env.NODE_ENV)

function App() {
  const func = () => {
    return new Promise((resolve, reject) => {
      return resolve('666666')
    })
  }

  useEffect(() => {
    const arr = [1,2,3,4,5];
    func().then(data => {
      console.log('=================', data, [...arr])
    })
  }, [])

  return (
    <div className='app'>
      <h2>hello react !!24333 </h2>
      <img src={logo} alt="" />
      <Desc />
    </div>
  )
}

export default App
