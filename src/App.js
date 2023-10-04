import "./App.css"

function App() {
  const clickHandler = () => {
    const frame = document.getElementById("frame")
    frame.style.display = "block"
  }

  return (
    <div className="App">
      <button onClick={clickHandler}>Пополнить</button>
      <iframe
        id="frame"
        src="https://datcom.313.kz/sign-in"
        frameBorder="1"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  )
}

export default App
