import { useState } from "react"
import "./App.css"

function App() {
  const [token, setToken] = useState("")

  const onClickHandler = () => {
    const frameElem = document.getElementById("id_frame")
    let user = {
      userId: "user",
      clientId: "test",
      clientSecret: "secret"
    }
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
    if (token) {
      localStorage.setItem("token", token)
      frameElem.innerHTML = `<iframe
      id="frame"
      name="biometrics"
      src="https://biometrics.paydala.kz/frame/"
      frameBorder="1"
      width="1000px"
      height="500px"
    ></iframe>`
      let win = window.frames.biometrics
      const message = token
      win.postMessage(message, "*")
    }
  }
  return (
    <div className="App">
      <button onClick={onClickHandler}>Пополнить</button>
      <div id="id_frame"></div>
    </div>
  )
}

export default App
