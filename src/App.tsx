import React from "react"
import { Routes, Route } from "react-router-dom"
import SuccessIdentification from "./containers/SuccessIdentification"
import FailIdentification from "./containers/FailIdentification"
import Identification from "./pages/Identification"

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
        <Route path="/" element={<Identification />} />
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
