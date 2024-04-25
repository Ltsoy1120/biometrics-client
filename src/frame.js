export const frame = {
  startFrame: (state, getPersonalData) => {
    const frame = document.getElementById("frame")
    frame.height = frame.contentWindow.parent.innerHeight
    let win = window.frames.biometrics

    if (win) {
      frame.style.display = "block" // открываем фрейм

      // отправляем данные в biometrics
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
        // вызываем пользовательскую функцию для получения персональных данных
        getPersonalData(state.userId)

        frame.style.display = "none" // закрываем фрейм

        window.removeEventListener("message", messageHandler)
      }
    }

    window.addEventListener("message", messageHandler, false)
  }
}
