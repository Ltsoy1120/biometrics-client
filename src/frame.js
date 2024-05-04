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
      if (data === "SERVER_ERROR") {
        frame.style.display = "none" // Закрываем фрейм
        return
      }

      if (
        data &&
        typeof data === "object" &&
        (data.status === "IDENTIFIED" ||
          data.status === "NOT_IDENTIFIED" ||
          data.status === "BLOCKED") &&
        state.userId
      ) {
        if (data.subStatus && data.subStatus !== "UNFINISHED") {
          // Вызываем пользовательскую функцию для получения персональных данных
          getPersonalData(state.userId)
        }

        frame.style.display = "none" // Закрываем фрейм

        window.removeEventListener("message", messageHandler)
      }
    }

    window.addEventListener("message", messageHandler, false)
  }
}
