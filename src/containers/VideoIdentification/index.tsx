import React, { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import Button from "../../components/Button"
import { IVeriliveResult } from "../../interfaces"
import "./style.scss"

const VideoIdentification = () => {
  const api_key = "Fs7eg2hhVqgnOaMIjPkOke7WMqJrjGLO"
  const api_secret = "f0cc9600aec5a984baa889240e9e0e94"
  const personID = "000001"

  const [accessToken, setAccessToken] = useState("")
  console.log("accessToken", accessToken)
  const [veriliveResults, setVeriliveResults] = useState()
  console.log("veriliveResults", veriliveResults)
  const navigate = useNavigate()

  let config = {
    recordVideo: false,
    videoBitrate: 2500000,
    rotated: false,
    lang: "custom",

    render: {
      oval: true,
      ovalType: "contour",
      ovalRingColor: {
        default: "#F5F542",
        actionSuccess: "#00F500",
        actionFailure: "#F50000",
        sessionSuccess: "#00F500",
        sessionFailure: "#F50000"
      },
      ovalWidth: 1.0,

      overlay: true,
      overlayColor: {
        default: "#2F4F4F"
      },
      overlayTransparency: {
        default: 0.55
      },

      arrow: true,
      arrowColor: {
        default: "#F0F0F0"
      },
      arrowProgressColor: {
        default: "#404040"
      },

      hint: true,
      hintPosition: "bottom",
      hintTextColor: {
        default: "#C8C9CC"
      },
      hintFontType: "Arial",
      hintUseProgressiveFontSize: true,
      hintProgressiveFontSizeMultiplier: 1.0,
      hintFontSize: 25,
      hintCloudColor: {
        default: "#2D312F"
      },

      videoUploadProgressBar: true,
      videoUploadProgressBarColor1: "#FFEA82",
      videoUploadProgressBarColor2: "#eee"
    },

    hints: {
      // Hints
      noHint: "",
      noHintPrimary: "",
      noHintDetailed: "",

      noFace: "Вас Не Видно",
      noFacePrimary: "Вас Не Видно",
      noFaceDetailed: "",

      badLight: "Выравните Освещение",
      badLightPrimary: "Выравните Освещение",
      badLightDetailed: "",

      closer: "Ближе",
      closerPrimary: "Поместите лицо в овал",
      closerDetailed: "",

      closerOvalTransitionPrimary: "Поднесите телефон ближе",
      closerOvalTransitionDetailed: "",

      away: "Отдалитесь",
      awayPrimary: "Поместите лицо в овал",
      awayDetailed: "",

      closerToCenter: "Ближе к Центру Экрана",
      closerToCenterPrimary: "Поместите лицо в овал",
      closerToCenterDetailed: "",

      targetLeft: "Медленно Поворачивайте Голову Влево",
      targetLeftPrimary: "Налево",
      targetLeftDetailed: "Медленно Поворачивайте Голову Влево",

      targetRight: "Медленно Поворачивайте Голову Вправо",
      targetRightPrimary: "Направо",
      targetRightDetailed: "Медленно Поворачивайте Голову Вправо",

      targetCenter: "Посмотрите Прямо",
      targetCenterPrimary: "",
      targetCenterDetailed: "",

      lookWait: "Смотрите Прямо и Подождите",
      lookWaitPrimary: "Отлично!",
      lookWaitDetailed: "",

      waitForProcessing: "Подождите, идет обработка...",
      waitForProcessingPrimary: "Почти закончили",
      waitForProcessingDetailed: "Подождите немного, мы кое-что\nпроверяем",

      sessionSuccess: "Вы Прошли!",
      sessionSuccessPrimary: "Вы Настоящий!",
      sessionSuccessDetailed: "",

      actionSuccessPrimary: "Отлично!",
      actionSuccessDetailed: "",

      sessionFailure: "Вы Не Прошли!",
      sessionFailurePrimary: "Живость не подтверждена",
      sessionFailureDetailed:
        "Попробуйте, еще раз. Постарайтесь\n снимать с хорошим освещением",

      sessionError: "Произошла какая-то ошибка.\nПопробуйте перезапустить",
      sessionErrorPrimary: "Ошибка",
      sessionErrorDetailed:
        "Произошла какая-то ошибка.\nПопробуйте перезапустить",

      clickMe: "Нажмите",

      // Errors
      NotSupportedBrowserError:
        "Ваш браузер не поддерживается. Пожалуйста, используйте последние браузера Chrome, Firefox, Safari или Edge.",
      NoWrapperError: "Что-то не так, попробуйте позже",

      CameraNotFoundError:
        "Веб-камера не найдена. Пожалуйста, подсоедините веб-камеру к устройству и обновите эту страничку.",
      CameraNotAllowedError:
        "Отказано в доступе к веб-камере. Пожалуйста, обновите эту страничку и разрешите доступ к веб-камере.",
      CameraOverconstrainedError:
        "Веб-камера с минимальным разрешением 480p не найдена. Пожалуйста, подсоедините веб-камеру 480p (или выше) и обновите эту страничку.",
      CameraSecurityError:
        "Ваш браузер отказал в доступе к веб-камере. Пожалуйста, измените настройки доступа к веб-камере в Вашем браузере.",
      CameraNotReadableError:
        "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
      CameraAbortError:
        "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
      CameraBrowserAppNeedsConstantCameraPermission:
        "Скорее всего вашему браузеру нужно больше прав на камеру. Пожалуйста используйте последние браузера Chrome, Firefox, Safari или следуйте инструкции чтобы дать больше прав https://s3.eu-central-1.amazonaws.com/verilive-statics.verigram.ai/android_camera_permission_instruction.pdf",
      CameraVirtualSuspected: "Что-то странное с вашей камерой.",

      CameraStreamInterrupted: "Работа камеры прервалась.",
      CameraStreamInterruptedPrimary: "Ошибка",
      CameraStreamInterruptedDetailed: "Работа камеры прервалась",

      SlowInternetError:
        "Плохое соединение. Попробуйте подключиться к более быстрому интернету",
      SlowInternetErrorPrimary: "Ошибка",
      SlowInternetErrorDetailed:
        "Плохое соединение. Попробуйте подключиться\nк более быстрому интернету",

      ServerWorkError: "Что-то не так с сервером, попробуйте еще раз",
      ServerWorkErrorPrimary: "Ошибка",
      ServerWorkErrorDetailed: "Проблема с сервером, попробуйте еще раз",

      ServerAuthorizationError: "Что-то не так, попробуйте позже",
      ServerAuthorizationErrorPrimary: "Ошибка",
      ServerAuthorizationErrorDetailed: "Сервис не авторизован",

      ServerConnectionError:
        "Сервер не доступен. Проверьте интернет, попробуйте поменять сеть, выключить VPN",
      ServerConnectionErrorPrimary: "Ошибка",
      ServerConnectionErrorDetailed:
        "Сервер не доступен. Проверьте интернет,\n попробуйте поменять сеть, выключить VPN",

      ClientWorkError: "Что-то не так, попробуйте еще раз",
      ClientWorkErrorPrimary: "Ошибка",
      ClientWorkErrorDetailed: "Ошибка на клиенте, попробуйте еще раз"
    }
  }
  useEffect(() => {
    const getAccessToken = async () => {
      await fetch(
        `https://dev.verilive.verigram.ai:5001/paydala?person_id=${personID}`
      )
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token))
    }
    getAccessToken()
  }, [personID])

  useEffect(() => {
    const runVeriliveHandler = async () => {
      const verilive = window.verilive

      verilive
        .init(
          "https://services.verigram.ai:8443/s/verilive/verilive",
          api_key,
          config
        )
        .then(() => {
          console.log("Successful initialization")
          console.log(verilive.isCameraInitialized())

          // Successful initialization. Now you can start liveness process.
        })
        .catch((error: any) => {
          console.log(error)
          errorCallback(error)
          // e.g., Show error to user
        })
      // verilive.setVeriliveTwoURL("https://services.verigram.cloud")

      let sessionId = await verilive.start(accessToken, personID)
      console.log("sessionId", sessionId)

      verilive.successCallback = async function (result: any) {
        console.log("successCallback", result)
        setVeriliveResults(result)
        successCallback(result)
        // await verilive.dispose()
      }
      verilive.failCallback = async function (result: any) {
        console.log("failCallback", result)
        setVeriliveResults(result)
        failCallback(result)
        // await verilive.dispose()
      }
      verilive.errorCallback = async function (result: any) {
        console.log("errorCallback", result)
        errorCallback(result)
        // await verilive.dispose()
      }
      verilive.updateCallback = updateCallback
    }
    if (accessToken) {
      runVeriliveHandler()
    }
  }, [accessToken])

  const showResults = (data: IVeriliveResult) => {
    const results = document?.getElementById("results")
    if (results) {
      results.innerHTML = JSON.stringify(data, undefined, 2).replace(
        /</g,
        "&lt;"
      )
    }
  }

  // Successful Verilive json results
  const successCallback = (data: IVeriliveResult) => {
    // showResults(data)

    // const canvas = document.getElementById(
    //   "bestframe_canvas"
    // ) as HTMLCanvasElement
    // const ctx = canvas?.getContext("2d")
    // const image = new Image()
    // image.onload = function () {
    //   ctx?.drawImage(image, 0, 0)
    //   if (canvas) {
    //     canvas.width = image.width
    //     canvas.height = image.height
    //   }
    //   ctx?.drawImage(image, 0, 0)
    // }
    // image.src = "data: image/jpeg;base64," + data.bestframe
    navigate("/success-identification")
  }

  // Failure Verilive json results
  const failCallback = (data: IVeriliveResult) => {
    console.log("data-failCallback", data)

    // showResults(data)
    navigate("/fail-identification")
  }

  // Error Verilive json results
  const errorCallback = (data: IVeriliveResult) => {
    console.log("data-errorCallback", data)
    // showResults(data)
  }

  function updateCallback(data: any) {
    // console.log("updateCallback", data)
  }

  /*  Step 3. Inside your js file call verilive.init(url, apiKey, config)
   *          method to initialize VeriLive.
   *          It will return a Promise: 'resolved' if VeriLive is initialized,
   *                                    'rejected' if VeriLive has failed to initialized.
   */

  // =================
  //   verilive.waitScreenStartedCallback = waitScreenStartedCallback
  //   verilive.videoRecordingNotSupportedCallback =
  //     videoRecordingNotSupportedCallback
  //   verilive.videoReadyCallback = videoReadyCallback
  //   verilive.videoSentCallback = videoSentCallback
  //   verilive.videoSendProgressCallback = videoSendProgressCallback
  //   verilive.videoSendErrorCallback = videoSendErrorCallback

  //   function videoRecordingNotSupportedCallback() {
  //     console.log("video recording is not supported on this browser/device")
  //   }

  //   function waitScreenStartedCallback() {
  //     console.log("waitScreenStartedCallback called")
  //   }

  //   function videoReadyCallback(blob, session_id) {
  //     console.log(`Video is ready` + session_id)
  //   }

  //   function videoSendProgressCallback(event, session_id) {
  //     // console.log("Downloaded " + event.loaded + "bytes of " + event.total + " of session " + session_id);
  //   }

  //   function videoSendErrorCallback(session_id) {
  //     console.log("videoSendErrorCallback " + session_id)
  //   }

  //   function videoSentCallback(session_id) {
  //     console.log(`Video is sent` + session_id)
  //   }
  // ==================

  //   async function getAccessTokenFromExampleService() {
  //     const personId = document.getElementById("person_id_input").value
  //     response = await fetch(
  //       "https://dev.verilive.verigram.ai:5001/paydala?person_id=" + personId,
  //       {}
  //     )
  //     const result = await response.json()
  //     return result.access_token
  //   }

  //   async function getAccessTokenFromSaaSApi() {
  //     const ts = Math.floor(Date.now() / 1000)
  //     const personId = document.getElementById("person_id_input").value
  //     const signature = "" + ts + "/resources/access-token?person_id=" + personId
  //     const apiKey = document.getElementById("direct_token_api_key_input").value
  //     const apiSecret = document.getElementById("api_secret_input").value
  //     const hmacDigest = await getHmacDigest(signature, apiSecret)

  //     response = await fetch(
  //       "https://services.verigram.cloud/resources/access-token?person_id=" +
  //         personId,
  //       {
  //         headers: {
  //           "X-Verigram-Api-Version": "1.1",
  //           "X-Verigram-Api-Key": apiKey,
  //           "X-Verigram-Hmac-SHA256": hmacDigest,
  //           "X-Verigram-Ts": "" + ts
  //         }
  //       }
  //     )
  //     const result = await response.json()
  //     return result.access_token
  //   }

  //   async function getHmacDigest(message, apiSecret) {
  //     var enc = new TextEncoder("utf-8")

  //     let key = await window.crypto.subtle.importKey(
  //       "raw",
  //       enc.encode(apiSecret),
  //       { name: "HMAC", hash: { name: "SHA-256" } },
  //       false,
  //       ["sign", "verify"]
  //     )
  //     let signature = await window.crypto.subtle.sign(
  //       "HMAC",
  //       key,
  //       enc.encode(message)
  //     )

  //     var b = new Uint8Array(signature)
  //     var str = Array.prototype.map
  //       .call(b, x => x.toString(16).padStart(2, "0"))
  //       .join("")
  //     return str
  //   }

  //   async function onGetAccessTokenButtonClick() {
  //     let tokenWay = document.querySelector(
  //       'input[name="token_way"]:checked'
  //     ).value

  //     let accessToken = "hmm"
  //     if (tokenWay == "example_token") {
  //       accessToken = await getAccessTokenFromExampleService()
  //     } else if (tokenWay == "direct_token") {
  //       accessToken = await getAccessTokenFromSaaSApi()
  //     }
  //     document.getElementById("access_token_input").value = accessToken
  //   }

  //   async function onStartButtonClick() {
  //     document.getElementById("results").innerHTML = ""
  //     const canvas = document.getElementById("bestframe_canvas")
  //     const ctx = canvas.getContext("2d")
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)

  //     const accessToken = document.getElementById("access_token_input").value
  //     const personId = document.getElementById("person_id_input").value

  //     let sessionId = ""
  //     const authType = document.querySelector(
  //       'input[name="auth_type"]:checked'
  //     ).value

  //     if (authType === "auth_1_1") {
  //       console.log(verilive.name + "Using auth 1.1")
  //       sessionId = await verilive.start(accessToken, personId)
  //     } else if (
  //       verilive.apiKey === "" ||
  //       verilive.apiKey === null ||
  //       verilive.apiKey === undefined
  //     ) {
  //       console.log("Using no auth")
  //       sessionId = await verilive.start()
  //     } else {
  //       console.log("Using auth 1.0")
  //       sessionId = await verilive.start()
  //     }
  //     console.log(": Session ID - " + sessionId)

  //     document.getElementById("info_current_session").innerHTML = sessionId
  //   }

  return (
    <>
      {/* <div id="id_verilive"></div> */}

      {/* <div className="video-identification">
        <img src="/static/images/video_id.png" alt="video_id" />
        <h1>Идентификация по видео</h1>
        <Button onClick={() => runVeriliveHandler()} width={328}>
          Начать
        </Button>
      </div> */}
      {/* <div className="verilive-results">
        <pre id="results"></pre>
        <canvas id="bestframe_canvas"></canvas>
      </div>
      <div className="error-modal"></div> */}
    </>
  )
}

export default VideoIdentification
