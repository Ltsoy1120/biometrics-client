import { useEffect, useState } from "react"
import InputMask from "react-input-mask"
import { frame } from "./frame"
import "./App.css"

// function App() {
//   const [user, setUser] = useState({
//     userId: "",
//     phoneNumber: "73780559227"
//   })
//   const [state, setState] = useState({
//     userId: "",
//     token: "",
//     iin: ""
//   })
//   const [personalData, setPersonalData] = useState()
//   const [messageData, setMessageData] = useState()
//   console.log("state", state)

//   useEffect(() => {
//     const frame = document.getElementById("frame")
//     if (state.token && state.userId) {
//       frame.style.display = "block"

//       let win = window.frames.biometrics
//       win.postMessage(JSON.stringify(state), "*")
//     }
//   }, [state.token, state.userId, state])

//   useEffect(() => {
//     window.addEventListener(
//       "message",
//       function (event) {
//         var data = event.data
//         const frame = document.getElementById("frame")
//         console.log("client======data======onmessage", data)
//         setMessageData(data)
//         if (data) {
//           frame.style.display = "none"
//         }
//       },
//       false
//     )
//   }, [])

//   useEffect(() => {
//     const getPersonalData = async userId => {
//       await fetch(
//         `https://biometrics.paydala.kz/api/verification/personal/data/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             accept: "*/*",
//             "X-API-KEY": "test",
//             "X-API-SECRET": "secret"
//           }
//         }
//       )
//         .then(response => response.json())
//         .then(data => setPersonalData(data))
//     }
//     if (messageData === "IDENTIFIED" && state.userId) {
//       getPersonalData(state.userId)
//     }
//   }, [messageData, state.userId])

//   const onClickHandler = () => {
//     const getToken = async () => {
//       await fetch(
//         `https://biometrics.paydala.kz/api/verification/organization/token`,
//         {
//           method: "POST",
//           headers: {
//             accept: "*/*",
//             "Content-Type": "application/json",
//             "X-API-KEY": "test",
//             "X-API-SECRET": "secret"
//           },
//           body: JSON.stringify(user)
//         }
//       )
//         .then(response => response.json())
//         .then(data => setState({ ...state, token: data.token }))
//     }
//     getToken()
//   }
//   const onChangeHandler = e => {
//     const value = e.target.value
//     const name = e.target.name
//     setUser({ ...user, [name]: value })
//     setState({ ...state, [name]: value })
//   }

//   return (
//     <div className="App">
//       <div className="inputs">
//         <div className="input-field">
//           <label htmlFor="userId">Обязательное поле *</label>
//           <input
//             id="userId"
//             name="userId"
//             placeholder="Ваш userId"
//             onChange={onChangeHandler}
//           />
//         </div>
//         <div className="input-field">
//           <label htmlFor="iin">Необязательное поле</label>
//           <input
//             id="iin"
//             name="iin"
//             placeholder="Ваш ИИН"
//             onChange={onChangeHandler}
//           />
//         </div>
//       </div>
//       <button onClick={onClickHandler}>Пополнить</button>
//       {personalData && (
//         <div className="personalData">
//           <p style={{ fontWeight: "bold" }}>
//             status: <span>{personalData.status}</span>
//           </p>

//           <p style={{ fontWeight: "bold" }}>
//             subStatus: <span>{personalData.subStatus}</span>
//           </p>

//           <p style={{ fontWeight: "bold" }}>
//             personalData:{" "}
//             <span>{JSON.stringify(personalData.personalData)}</span>
//           </p>
//         </div>
//       )}
//       <iframe
//         id="frame"
//         title="Frame"
//         name="biometrics"
//         src="https://biometrics.paydala.kz/frame/"
//         allow="camera"
//         frameBorder="1"
//         width="500px"
//         height="600px"
//         scrolling="no"
//         style={{ display: "none" }}
//       ></iframe>
//     </div>
//   )
// }

// export default App

function App() {
  const API_URL =
    process.env.REACT_APP_API_URL ?? "https://test-biometrics.paydala.kz/api/"
  const BASE_URL =
    process.env.REACT_APP_BASE_URL ?? "https://test-biometrics.paydala.kz/frame"

  const [state, setState] = useState({
    userId: "",
    token: "",
    iin: "",
    phoneNumber: ""
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
          "X-API-KEY": "test",
          "X-API-SECRET": "secret"
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
          "X-API-KEY": "test",
          "X-API-SECRET": "secret"
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

  // const personalData = {
  //   status: "IDENTIFIED",
  //   subStatus: null,
  //   phoneNumber: "73780559227",
  //   personalData: {
  //     person: {
  //       iin: "751120401609",
  //       name: "ЕЛЕНА",
  //       gender: {
  //         code: 2,
  //         nameKz: "Әйел",
  //         nameRu: "Женский",
  //         changeDate: "2013-05-17T17:29:19+06:00"
  //       },
  //       surname: "ЦОЙ",
  //       birthDate: "1975-11-20",
  //       documents: {
  //         document: [
  //           {
  //             name: "ЕЛЕНА",
  //             type: {
  //               code: "001",
  //               nameKz: "ҚР ПАСПОРТЫ",
  //               nameRu: "ПАСПОРТ РК",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             },
  //             number: "N11177028",
  //             status: {
  //               code: "00",
  //               nameKz: "ҚҰЖАТ ЖАРАМДЫ",
  //               nameRu: "ДОКУМЕНТ ДЕЙСТВИТЕЛЕН",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             },
  //             endDate: "2027-04-05",
  //             surname: "ЦОЙ",
  //             beginDate: "2017-04-06",
  //             birthDate: "1975-11-20",
  //             patronymic: "ГЕННАДЬЕВНА",
  //             issueOrganization: {
  //               code: "002",
  //               nameKz: "ҚР ІШКІ ІСТЕР МИНИСТРЛІГІ",
  //               nameRu: "МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РК",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             }
  //           },
  //           {
  //             name: "ЕЛЕНА",
  //             type: {
  //               code: "002",
  //               nameKz: "ҚР ЖЕКЕ КУӘЛІГІ",
  //               nameRu: "УДОСТОВЕРЕНИЕ РК",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             },
  //             number: "053620489",
  //             status: {
  //               code: "00",
  //               nameKz: "ҚҰЖАТ ЖАРАМДЫ",
  //               nameRu: "ДОКУМЕНТ ДЕЙСТВИТЕЛЕН",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             },
  //             endDate: "2033-06-26",
  //             surname: "ЦОЙ",
  //             beginDate: "2023-06-27",
  //             birthDate: "1975-11-20",
  //             patronymic: "ГЕННАДЬЕВНА",
  //             issueOrganization: {
  //               code: "002",
  //               nameKz: "ҚР ІШКІ ІСТЕР МИНИСТРЛІГІ",
  //               nameRu: "МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РК",
  //               changeDate: "2008-03-01T13:21:45+06:00"
  //             }
  //           }
  //         ]
  //       },
  //       birthPlace: {
  //         city: "-",
  //         region: {
  //           code: 1910270,
  //           nameKz: "ТУРКІСІБ",
  //           nameRu: "ТУРКСИБСКИЙ",
  //           changeDate: "2008-03-01T13:21:45+06:00"
  //         },
  //         country: {
  //           code: 398,
  //           nameKz: "ҚАЗАҚСТАН",
  //           nameRu: "КАЗАХСТАН",
  //           changeDate: "2008-03-01T13:21:44+06:00"
  //         },
  //         district: {
  //           code: 1910,
  //           nameKz: "АЛМАТЫ",
  //           nameRu: "АЛМАТЫ",
  //           changeDate: "2008-03-01T13:21:45+06:00"
  //         }
  //       },
  //       lifeStatus: {
  //         code: 0,
  //         nameKz: "Қалыпты",
  //         nameRu: "Нормальный",
  //         changeDate: "2008-03-01T13:21:45+06:00"
  //       },
  //       patronymic: "ГЕННАДЬЕВНА",
  //       regAddress: {
  //         city: "Ащибулакский, Мухаметжан Туймебаев",
  //         region: {
  //           code: 1907211,
  //           nameKz: "ІЛЕ АУДАНЫ",
  //           nameRu: "ИЛИЙСКИЙ РАЙОН",
  //           changeDate: "2008-03-01T13:21:45+06:00"
  //         },
  //         street:
  //           "ПОТРЕБИТЕЛЬСКИЙ КООПЕРАТИВ САДОВОДЧЕСКИХ ТОВАРИЩЕСТВ Алмагуль, УЛИЦА 2-Линия",
  //         country: {
  //           code: 398,
  //           nameKz: "ҚАЗАҚСТАН",
  //           nameRu: "КАЗАХСТАН",
  //           changeDate: "2008-03-01T13:21:44+06:00"
  //         },
  //         building: 33,
  //         district: {
  //           code: 1907,
  //           nameKz: "АЛМАТЫ",
  //           nameRu: "АЛМАТИНСКАЯ",
  //           changeDate: "2008-03-01T13:21:45+06:00"
  //         },
  //         beginDate: "2013-01-18"
  //       },
  //       citizenship: {
  //         code: 398,
  //         nameKz: "ҚАЗАҚСТАН",
  //         nameRu: "КАЗАХСТАН",
  //         changeDate: "2008-03-01T13:21:44+06:00"
  //       },
  //       nationality: {
  //         code: 168,
  //         nameKz: "КОРЕЙ",
  //         nameRu: "КОРЕЯНКА",
  //         changeDate: "2008-03-01T13:21:45+06:00"
  //       }
  //     }
  //   }
  // }

  return (
    <div className="App">
      <form className="form">
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
        src={`${BASE_URL}`}
        allow="camera"
        frameBorder="1"
        width="500px"
        // height={document.body.height()}
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
            {Object.entries(personalData.personalData.person).map(item =>
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
