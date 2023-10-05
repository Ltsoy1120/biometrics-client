import React from "react"
import IinIdentification from "./containers/IInIdentification"
import { Routes, Route } from "react-router-dom"
import VideoIdentification from "./containers/VideoIdentification"
import SuccessIdentification from "./containers/SuccessIdentification"
import FailIdentification from "./containers/FailIdentification"

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Routes>
        <Route path="/" element={<IinIdentification />} />
        <Route path="/video-identification" element={<VideoIdentification />} />
        <Route
          path="/success-identification"
          element={<SuccessIdentification />}
        />
        <Route path="/fail-identification" element={<FailIdentification />} />
      </Routes>
      {/* <iframe
        src="https://datcom.313.kz/sign-in"
        width={"100%"}
        height={"100%"}
      ></iframe> */}
    </div>
  )
}

export default App
