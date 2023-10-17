import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [user, setUser] = useState({
    userId: "",
    phoneNumber: "73780559227"
  })
  const [state, setState] = useState({
    userId: "",
    token: "",
    iin: ""
  })
  const [personalData, setPersonalData] = useState()
  const [messageData, setMessageData] = useState()
  console.log("state", state)

  useEffect(() => {
    const frame = document.getElementById("frame")
    if (state.token && state.userId) {
      frame.style.display = "block"

      let win = window.frames.biometrics
      win.postMessage(JSON.stringify(state), "*")
    }
  }, [state.token, state.userId, state])

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        var data = event.data
        const frame = document.getElementById("frame")
        console.log("client======data======onmessage", data)
        setMessageData(data)
        if (data) {
          frame.style.display = "none"
        }
      },
      false
    )
  }, [])

  useEffect(() => {
    const getPersonalData = async token => {
      await fetch(
        `https://biometrics.paydala.kz/api/verification/personal/data`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "X-ORG-TOKEN": token
          }
        }
      )
        .then(response => response.json())
        .then(data => setPersonalData(data))
    }
    if (messageData === "IDENTIFIED" && state.token) {
      getPersonalData(state.token)
    }
  }, [messageData, state.token])

  const onClickHandler = () => {
    const getToken = async () => {
      await fetch(
        `https://biometrics.paydala.kz/api/verification/organization/token`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            "X-API-KEY": "test",
            "X-API-SECRET": "secret"
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
      {personalData && (
        <div className="personalData">
          <p style={{ fontWeight: "bold" }}>
            status: <span>{personalData.status}</span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            subStatus: <span>{personalData.subStatus}</span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            personalData:{" "}
            <span>{JSON.stringify(personalData.personalData)}</span>
          </p>
        </div>
      )}
      <iframe
        id="frame"
        title="Frame"
        name="biometrics"
        src="https://biometrics.paydala.kz/frame/"
        allow="camera"
        frameBorder="1"
        width="500px"
        height="600px"
        scrolling="no"
        style={{ display: "none" }}
      ></iframe>
    </div>
  )
}

export default App
