export const frame = {
  startFrame: (state, getPersonalData) => {
    const frame = document.getElementById("frame")
    let win = window.frames.biometrics

    if (win) {
      frame.style.display = "block"
      win.postMessage(JSON.stringify(state), "*")
    }

    window.addEventListener(
      "message",
      function (event) {
        var data = event.data
        if (
          (data === "IDENTIFIED" ||
            data === "NOT_IDENTIFIED" ||
            data === "BLOCKED") &&
          state.userId
        ) {
          console.log("client======data======onmessage", data)
          getPersonalData(state.userId)
          frame.style.display = "none"
        }
      },
      false
    )
  }
}
