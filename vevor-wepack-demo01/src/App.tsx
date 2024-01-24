import React, { useEffect } from 'react'
import '@/common/css/base.css';
// import isarray from 'isarray';
import logo from '@/assets/11.png'
import Desc from '@/Desc';
import Test01  from '@/components/test/Test01';
import Test02  from '@/components/test/Test02';
import styles from './App.less';


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
      console.log('====ar====', isarray(arr));
    })

    // window.fetch('/api/users').then(res => res.json()).then(res => {
    //   console.log('=====res', res);
    // })
  }, [])

  return (
    <div className={styles.app}>
      <h2>hello react !!24333 </h2>
      <img src={logo} alt="" />
      <div className='common'>common</div>
      <Desc />
      <hr />
      <Test01 />
      <hr />
      <Test02 />
    </div>
  )
}

export default App
