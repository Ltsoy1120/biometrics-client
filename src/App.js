import { useEffect, useState } from "react"
import InputMask from "react-input-mask"
import { frame } from "./frame"
import "./App.css"

function App() {
  const API_URL =
    process.env.REACT_APP_API_URL ?? "https://test-biometrics.paydala.kz/api/"
  const BASE_URL =
    process.env.REACT_APP_BASE_URL ?? "https://test-biometrics.paydala.kz/frame"

  const [state, setState] = useState({
    userId: "",
    token: "",
    iin: "",
    phoneNumber: "",
    apiKey: "",
    apiSecret: ""
  })
  const [error, setError] = useState()

  const [personalData, setPersonalData] = useState()
  console.log("API_URL", API_URL)
  console.log("BASE_URL", BASE_URL)
  console.log("state", state)

  useEffect(() => {
    const getPersonalData = async userId => {
      await fetch(`${API_URL}verification/personal/data/${userId}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "X-API-KEY": state.apiKey ?? "test",
          "X-API-SECRET": state.apiSecret ?? "secret"
        }
      })
        .then(response => response.json())
        .then(data => setPersonalData(data))
    }
    if (state.token && state.phoneNumber) {
      frame.startFrame(state, getPersonalData)
    }
  }, [state, API_URL])

  const onClickHandler = () => {
    const getToken = async () => {
      await fetch(`${API_URL}verification/organization/token`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          "X-API-KEY": state.apiKey ?? "test",
          "X-API-SECRET": state.apiSecret ?? "secret"
        },
        body: JSON.stringify({ userId: state.userId })
      })
        .then(response => response.json())
        .then(data => {
          setError(data)
          setState({ ...state, token: data.token })
        })
        .catch(error => {
          setError(error)
        })
    }
    getToken()
  }

  const onChangeHandler = e => {
    const value = e.target.value
    const name = e.target.name
    if (name === "phoneNumber") {
      setState({ ...state, phoneNumber: value.replace(/\D/g, "") })
    } else {
      setState({ ...state, [name]: value })
    }
  }

  return (
    <div className="App">
      <form className="form">
        <div className="row">
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
          <div className="input-field">
            <label htmlFor="iin">Обязательное поле *</label>
            <InputMask
              mask="+7 (999) 999 99 99"
              maskChar="_"
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+7 (___) ___ __ __"
              value={state.phoneNumber}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label htmlFor="apiKey">Обязательное поле *</label>
            <input
              id="apiKey"
              name="apiKey"
              placeholder="API-KEY"
              onChange={onChangeHandler}
            />
          </div>
          <div className="input-field">
            <label htmlFor="apiSecret">Обязательное поле *</label>
            <input
              id="apiSecret"
              name="apiSecret"
              placeholder="API-SECRET"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onClickHandler}
          disabled={!state.userId && state.phoneNumber.length !== 11}
        >
          Отправить запрос
        </button>
      </form>
      <p>state: {JSON.stringify(state)}</p>
      <p>data: {JSON.stringify(error)}</p>
      <iframe
        id="frame"
        title="Frame"
        name="biometrics"
        src={`${BASE_URL}`} //https://test-biometrics.paydala.kz/frame
        allow="camera"
        frameBorder="1"
        width="500px"
        // height="800px"
        scrolling="no"
        style={{ display: "none" }}
      ></iframe>
      {personalData && (
        <div className="personalData">
          <p style={{ fontWeight: "bold" }}>
            status: <span>{personalData.status}</span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            subStatus: <span>{personalData.subStatus}</span>
          </p>

          <div class="table">
            {personalData &&
              personalData.personalData &&
              Object.entries(personalData.personalData.person).map(item =>
                item[0] === "documents" && item[1].document?.length > 0 ? (
                  item[1].document.map(doc => (
                    <div class="tr" key={doc.type?.code}>
                      <div class="td">{doc.type.nameRu}</div>
                      <div class="td">{JSON.stringify(doc)}</div>
                    </div>
                  ))
                ) : (
                  <div class="tr" key={item.type?.code}>
                    <div class="td">{item[0]}</div>
                    <div class="td">{JSON.stringify(item[1])}</div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
