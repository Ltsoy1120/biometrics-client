import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [token, setToken] = useState("")
  console.log("token", token)

  useEffect(() => {
    if (token) {
      //   const frameElem = document.getElementById("id_frame")
      //   frameElem.innerHTML = `<iframe
      //   id="frame"
      //   name="biometrics"
      //   src="https://biometrics.paydala.kz/frame/"
      //   frameBorder="1"
      //   width="1000px"
      //   height="500px"
      // ></iframe>`
      const frame = document.getElementById("frame")
      frame.style.display = "block"
      // frame.contentWindow.postMessage(token, "*")
      // console.log("frame", frame)

      let win = window.frames.biometrics
      console.log("win", win)
      // const message = token
      win.postMessage("11111111", "*")
    }
  }, [token])

  const onClickHandler = () => {
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
  }
  return (
    <div className="App">
      <button onClick={onClickHandler}>Пополнить</button>
      {/* <div id="id_frame"></div> */}
      <iframe
        id="frame"
        name="biometrics"
        src="https://biometrics.paydala.kz/frame/"
        frameBorder="1"
        width="1000px"
        height="500px"
        style={{ display: "none" }}
      ></iframe>
    </div>
  )
}

export default App
