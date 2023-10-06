const verilive = window.verilive
const api_key = process.env.REACT_APP_API_KEY

export const verigramService = {
  run(
    accessToken: string,
    personID: string,
    openModal: (message: string) => void
  ) {
    verilive
      .init(
        "https://services.verigram.ai:8443/s/verilive/verilive",
        api_key,
        verilive.getDefaultConfig()
      )
      .then(async () => {
        console.log("Successful initialization")
        console.log(verilive.isCameraInitialized())
        await verilive.start(accessToken, personID)
      })
      .catch((error: any) => {
        console.log(error)
        openModal(error.message)
      })
  }
}
