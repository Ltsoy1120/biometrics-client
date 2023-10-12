import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [user, setUser] = useState({
    userId: "",
    clientId: "test",
    clientSecret: "secret"
  })
  const [state, setState] = useState({
    userId: "",
    token: "",
    iin: ""
  })

  console.log("user", user)
  console.log("state", state)
  console.log("JSON.stringify(state)", JSON.stringify(state))

  useEffect(() => {
    if (state.token && state.userId) {
      const frame = document.getElementById("frame")
      frame.style.display = "block"

      let win = window.frames.biometrics
      win.postMessage(JSON.stringify(state), "*")
    }
  }, [state.token, state.userId, state])

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
        .then(data => setState({ ...state, token: data.token }))
    }
    getToken()
  }
  const onChangeHandler = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    setState({ ...state, [name]: value })
  }

  return (
    <div className="App">
      <div className="inputs">
        <div className="input-field">
          <label htmlFor="userId">Обязательное поле *</label>
          <input
            id="userId"
            name="userId"
            placeholder="Ваш userId"
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-field">
          <label htmlFor="iin">Необязательное поле</label>
          <input
            id="iin"
            name="iin"
            placeholder="Ваш ИИН"
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <button onClick={onClickHandler}>Пополнить</button>
      <iframe
        id="frame"
        title="Frame"
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
