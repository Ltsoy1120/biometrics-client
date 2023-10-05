import "./App.css"

function App() {
  const clickHandler = () => {
    let token = "12345"
    const frameElem = document.getElementById("id_frame")
    let user = {
      userId: "John",
      clientId: "Olimpbet",
      clientSecret: ""
    }
    const getToken = async () => {
      await fetch(
        `https://biometrics.com/api/verification/organization/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      )
        .then(response => response.json())
        .then(data => (token = data.token))
    }
    // getToken()
    if (token) {
      localStorage.setItem("token", token)
      frameElem.innerHTML = `<iframe
      id="frame"
      src="https://datcom.313.kz/sign-in"
      frameBorder="1"
      width="1000px"
      height="500px"
    ></iframe>`
    }
  }
  return (
    <div className="App">
      <button onClick={clickHandler}>Пополнить</button>
      <div id="id_frame"></div>
    </div>
  )
}

export default App
