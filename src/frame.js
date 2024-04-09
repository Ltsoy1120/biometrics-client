export const frame = {
  startFrame: (state, getPersonalData) => {
    const frame = document.getElementById("frame")
    frame.height = frame.contentWindow.parent.innerHeight
    let win = window.frames.biometrics

    if (win) {
      frame.style.display = "block"
      win.postMessage(JSON.stringify(state), "*")
    }

    // Функция-обработчик события message
    const messageHandler = function (event) {
      const data = event.data
      if (
        (data === "IDENTIFIED" ||
          data === "NOT_IDENTIFIED" ||
          data === "BLOCKED") &&
        state.userId
      ) {
        console.log("client======data======onmessage", data)
        getPersonalData(state.userId)
        frame.style.display = "none"

        // Удаляем слушателя события message после получения сообщения
        window.removeEventListener("message", messageHandler)
      }
    }

    // Добавляем слушателя события message
    window.addEventListener("message", messageHandler, false)
  }
}
