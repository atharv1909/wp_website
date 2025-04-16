import { useState } from 'react'
import './App.css'
import TimeTablePage from './components/TimeTablePage'
import HomePage from './components/homepage'
import NavBar from './components/NavBar'
import MarksTracker from './components/marksTracker'
import "./marksTracker.css"
import Attendance from './components/Attendance'
function renderWebsite(mode){
  switch (mode) {
    case "home":
      return <HomePage />
      break;
    
    case "timetable":
      return <TimeTablePage />
      break;

    case "attendance":
      return <Attendance />
    
    case "markstracker":
      return <MarksTracker />
      break;
  }
}

function App() {
  const [webMode, setWebMode] = useState("home");
  return (
    <>
      <NavBar setWebMode={setWebMode} webMode={webMode}/>
      {renderWebsite(webMode)}
    </>
  )
}

export default App
