import { useState } from 'react'
import './App.css'
import RosConnection from './RosConnection'
import FakeRosConnection from './FakeRosConnection'
import Card from './Components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      {/* <RosConnection /> */}
      <FakeRosConnection />
      <Card />
    </>
  )
}

export default App
