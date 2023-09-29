import React, { useState, useEffect } from "react"
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
      fetch(
        `https://dev.verilive.verigram.ai:5001/paydala?person_id=${personID}`
      )
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token))
    }
    getAccessToken()
  }, [personID])

  const runVeriliveHandler = () => {
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
        let sessionId = verilive.start(accessToken, personID)
        console.log("sessionId", sessionId)

        // Successful initialization. Now you can start liveness process.
      })
      .catch((error: any) => {
        console.log(error)
        errorCallback(error)
        // e.g., Show error to user
      })

    verilive.successCallback = async function (result: any) {
      console.log("successCallback", result)
      setVeriliveResults(result)
      successCallback(result)
      await verilive.dispose()
    }
    verilive.failCallback = async function (result: any) {
      console.log("failCallback", result)
      setVeriliveResults(result)
      failCallback(result)
      await verilive.dispose()
    }
    verilive.errorCallback = async function (result: any) {
      console.log("errorCallback", result)
      errorCallback(result)
      await verilive.dispose()
    }
  }

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
    showResults(data)

    const canvas = document.getElementById(
      "bestframe_canvas"
    ) as HTMLCanvasElement
    const ctx = canvas?.getContext("2d")
    const image = new Image()
    image.onload = function () {
      ctx?.drawImage(image, 0, 0)
      if (canvas) {
        canvas.width = image.width
        canvas.height = image.height
      }
      ctx?.drawImage(image, 0, 0)
    }
    image.src = "data: image/jpeg;base64," + data.bestframe
  }

  // Failure Verilive json results
  const failCallback = (data: IVeriliveResult) => {
    console.log("data-failCallback", data)

    showResults(data)
  }

  // Error Verilive json results
  const errorCallback = (data: IVeriliveResult) => {
    console.log("data-errorCallback", data)
    showResults(data)
  }

  /*  Step 3. Inside your js file call verilive.init(url, apiKey, config)
   *          method to initialize VeriLive.
   *          It will return a Promise: 'resolved' if VeriLive is initialized,
   *                                    'rejected' if VeriLive has failed to initialized.
   */

  //   function get_value_from_input(id) {
  //     let element = document.getElementById(id)
  //     return element.value
  //   }

  //   function get_value_from_checkbox(id) {
  //     let element = document.getElementById(id)
  //     return element.checked
  //   }

  //   function set_value_to_input(id, value) {
  //     let element = document.getElementById(id)
  //     element.value = value
  //   }

  //   function set_value_to_checkbox(id, value) {
  //     let element = document.getElementById(id)
  //     element.checked = value
  //   }

  //   function get_lang() {
  //     let ls = document.getElementsByName("lang")
  //     for (let i = 0; i < ls.length; i++) {
  //       if (ls[i].checked) {
  //         return ls[i].value
  //       }
  //     }
  //   }

  //   verilive.successCallback = successCallback
  //   verilive.failCallback = failCallback
  //   verilive.errorCallback = errorCallback
  //   verilive.updateCallback = updateCallback

  // =================
  //   verilive.waitScreenStartedCallback = waitScreenStartedCallback
  //   verilive.videoRecordingNotSupportedCallback =
  //     videoRecordingNotSupportedCallback
  //   verilive.videoReadyCallback = videoReadyCallback
  //   verilive.videoSentCallback = videoSentCallback
  //   verilive.videoSendProgressCallback = videoSendProgressCallback
  //   verilive.videoSendErrorCallback = videoSendErrorCallback
  // =================

  //   async function runVerilive() {
  //     document.getElementById("info_verilive_js_version").innerHTML =
  //       verilive.version

  //     let url = document.getElementById("server_url").value
  //     let url2 = document.getElementById("server_url2").value

  //     let apiKey = ""
  //     const authType = document.querySelector(
  //       'input[name="auth_type"]:checked'
  //     ).value
  //     if (authType === "auth_1_0") {
  //       apiKey = document.getElementById("api_key_input").value
  //     }

  //     let config = JSON.parse(document.getElementById("config_textarea").value)
  //     console.log(config)

  //     verilive
  //       .init(url, apiKey, config)
  //       .then(() => {
  //         // document.getElementById('info_browser').innerHTML = verilive.browser.name + " v" + verilive.browser.version
  //       })
  //       .catch(error => {
  //         document.getElementById("results").innerHTML = error
  //         // document.getElementById('info_browser').innerHTML = verilive.browser.name + " v" + verilive.browser.version
  //       })
  //     verilive.setVeriliveTwoURL(url2)
  //   }

  // Successful VeriLive json results
  //   function successCallback(data) {
  //     // E.g. Show results to user
  //     document.getElementById("results").innerHTML = JSON.stringify(
  //       data,
  //       undefined,
  //       2
  //     ).replace(/</g, "&lt;")
  //     const canvas = document.getElementById("bestframe_canvas")
  //     const ctx = canvas.getContext("2d")
  //     var image = new Image()
  //     image.onload = function () {
  //       ctx.drawImage(image, 0, 0)
  //       canvas.width = image.width
  //       canvas.height = image.height
  //       ctx.drawImage(image, 0, 0)
  //     }
  //     image.src = "data: image/jpeg;base64," + data.bestframe
  //   }

  // Failure VeriLive json results
  //   function failCallback(data) {
  //     // E.g. Show to user, say to retry again
  //     document.getElementById("results").innerHTML = JSON.stringify(
  //       data,
  //       undefined,
  //       2
  //     ).replace(/</g, "&lt;")
  //   }

  //   function errorCallback(data) {
  //     // E.g. Show to user, say to retry again
  //     document.getElementById("results").innerHTML = JSON.stringify(
  //       data,
  //       undefined,
  //       2
  //     ).replace(/</g, "&lt;")
  //   }

  //   function updateCallback(data) {
  //     // console.log(data);
  //   }

  // =================
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

  //   function onInitButtonClick() {
  //     runVerilive()
  //   }

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

  //   function copyTextToClipboard(text) {
  //     let textArea = document.createElement("textarea")

  //     textArea.style.position = "fixed"
  //     textArea.style.top = 0
  //     textArea.style.left = 0
  //     textArea.style.width = "2em"
  //     textArea.style.height = "2em"
  //     textArea.style.padding = 0
  //     textArea.style.border = "none"
  //     textArea.style.outline = "none"
  //     textArea.style.boxShadow = "none"
  //     textArea.style.background = "transparent"
  //     textArea.value = text

  //     document.body.appendChild(textArea)
  //     textArea.focus()
  //     textArea.select()

  //     try {
  //       let successful = document.execCommand("copy")
  //       let msg = successful ? "successful" : "unsuccessful"
  //       console.log("Copying text command was " + msg)
  //     } catch (err) {
  //       console.log("Oops, unable to copy")
  //     }

  //     document.body.removeChild(textArea)
  //   }

  //   function onCopySessionIdClick() {
  //     copyTextToClipboard(
  //       document.getElementById("info_current_session").innerHTML
  //     )
  //   }

  //   function onCopyBrowserClick() {
  //     copyTextToClipboard(document.getElementById("info_browser").innerHTML)
  //   }

  //   async function onStopButtonClick() {
  //     await verilive.stop()
  //   }

  //   function cacheInput(el) {
  //     localStorage.setItem(el.attributes["name"].value, el.value)
  //   }

  //   function unCacheInputs(root_el) {
  //     let inputs = root_el.children
  //     for (let i = 0; i < inputs.length; i++) {
  //       let el = inputs[i]
  //       if (
  //         el.tagName.toLowerCase() != "input" ||
  //         el.attributes["type"].value != "text"
  //       ) {
  //         try {
  //           unCacheInputs(el)
  //         } catch (e) {}
  //         continue
  //       }
  //       let cachedVal = localStorage.getItem(el.attributes["name"].value)
  //       if (cachedVal != null) {
  //         el.value = cachedVal
  //       }
  //     }
  //   }

  //   window.onload = function () {
  //     unCacheInputs(document.documentElement)
  //   }

  // async function onDisposeButtonClick() {
  //     await verilive.dispose();
  // }

  //   function updateAuthType() {
  //     let authType = document.querySelector(
  //       'input[name="auth_type"]:checked'
  //     ).value
  //     let tokenWay = document.querySelector(
  //       'input[name="token_way"]:checked'
  //     ).value

  //     let accessTokenP = document.getElementById("access_token_p")
  //     let directTokenApiKeyP = document.getElementById("direct_token_p")
  //     let apiKeyP = document.getElementById("api_key_p")

  //     if (authType === "auth_1_1") {
  //       accessTokenP.style.display = "block"
  //       apiKeyP.style.display = "none"
  //       if (tokenWay == "example_token") {
  //         directTokenApiKeyP.style.display = "none"
  //       } else if (tokenWay == "direct_token") {
  //         directTokenApiKeyP.style.display = "block"
  //       }
  //     } else if (authType === "auth_1_0") {
  //       accessTokenP.style.display = "none"
  //       apiKeyP.style.display = "block"
  //       directTokenApiKeyP.style.display = "none"
  //     } else {
  //       accessTokenP.style.display = "none"
  //       apiKeyP.style.display = "none"
  //       directTokenApiKeyP.style.display = "none"
  //     }
  //   }

  //   document.getElementById("auth_type").addEventListener(
  //     "change",
  //     function (e) {
  //       updateAuthType()
  //     },
  //     false
  //   )
  //   document.getElementById("token_way").addEventListener(
  //     "change",
  //     function (e) {
  //       updateAuthType()
  //     },
  //     false
  //   )

  //   updateAuthType()

  // For PWA Support
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", () => {
  //       navigator.serviceWorker.register("./sw.js").then(() => {
  //         console.log("Service Worker Registered")
  //       })
  //     })
  //   }

  return (
    <>
      <div className="video-identification">
        <img src="/static/images/video_id.png" alt="video_id" />
        <h1>Идентификация по видео</h1>
        <Button onClick={() => runVeriliveHandler()} width={328}>
          Начать
        </Button>
      </div>
      <div className="verilive-results">
        <pre id="results"></pre>
        <canvas id="bestframe_canvas"></canvas>
      </div>
    </>
  )
}

export default VideoIdentification
