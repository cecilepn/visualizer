import Canvas from './components/Canvas/Canvas'
import Landing from './components/Landing/Landing'
import Tracks from './components/Tracks/Tracks'
import Picker from './components/Picker/Picker'
import Queue from './components/Queue/Queue'

function App() {
  return (
    <>
      <Landing />
      <Queue />
      <Picker />
      <Tracks />
      <Canvas />
    </>
  )
}

export default App
