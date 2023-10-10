import { useState, useEffect } from "react"
import "./App.css"

function App() {
  let user = {
    userId: "user",
    clientId: "test",
    clientSecret: "secret"
  }
  const [token, setToken] = useState("")

  useEffect(() => {
    if (token) {
      const frame = document.getElementById("frame")
      frame.style.display = "block"

      let win = window.frames.biometrics
      win.postMessage(token, "*")
    }
  }, [token])

  const onClickHandler = () => {
    const getToken = async () => {
      await fetch(
        `https://biometrics.paydala.kz/api/verification/organization/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      )
        .then(response => response.json())
        .then(data => setToken(data.token))
    }
    getToken()
  }
  return (
    <div className="App">
      <button onClick={onClickHandler}>Пополнить</button>
      <iframe
        id="frame"
        name="biometrics"
        src="https://biometrics.paydala.kz/frame/"
        allow="camera"
        frameBorder="1"
        width="1000px"
        height="500px"
        style={{ display: "none" }}
      ></iframe>
    </div>
  )
}

export default App
