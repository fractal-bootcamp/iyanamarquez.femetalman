import './App.css'
import RosConnection from './RosConnection'
// import FakeRosConnection from './FakeRosConnection'
import Card from './Components/Card'

function App() {

  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      {/* <RosConnection /> */}
      {/* <FakeRosConnection /> */}
      <Card />
    </>
  )
}

export default App
