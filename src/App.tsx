import React from "react"
import VideoIdentification from "./containers/VideoIdentification"

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <VideoIdentification />
    </div>
  )
}

export default App
