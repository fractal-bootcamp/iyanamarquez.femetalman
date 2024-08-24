import './App.css'
import RosConnection from './RosConnection'
// import FakeRosConnection from './FakeRosConnection'
import ToolCard from './Components/ToolCard'
import ArmCard from './Components/ArmCard/ArmCard'
import GridTable from './Components/Measure/Layout'
import JoystickComponent from './Components/Measure/Joystick'

function App() {

  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      {/* <RosConnection /> */}
      {/* <FakeRosConnection /> */}
      {/* <ToolCard toolPosition="left" />
      <ToolCard toolPosition="right" /> */}
      {/* <div className="flex flex-row space-x-4 justify-center items-center">
        <ArmCard armPosition="left" />
        <ArmCard armPosition="right" />
      </div> */}
      <JoystickComponent />
      <GridTable />
    </>
  )
}

export default App
