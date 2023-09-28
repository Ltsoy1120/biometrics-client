import React, { useEffect } from "react"

function App() {
  // let config = {
  //   recordVideo: false,
  //   videoBitrate: 2500000,
  //   rotated: false,
  //   lang: "custom",

  //   render: {
  //     oval: true,
  //     ovalType: "contour",
  //     ovalRingColor: {
  //       default: "#F5F542",
  //       actionSuccess: "#00F500",
  //       actionFailure: "#F50000",
  //       sessionSuccess: "#00F500",
  //       sessionFailure: "#F50000"
  //     },
  //     ovalWidth: 1.0,

  //     overlay: true,
  //     overlayColor: {
  //       default: "#2F4F4F"
  //     },
  //     overlayTransparency: {
  //       default: 0.55
  //     },

  //     arrow: true,
  //     arrowColor: {
  //       default: "#F0F0F0"
  //     },
  //     arrowProgressColor: {
  //       default: "#404040"
  //     },

  //     hint: true,
  //     hintPosition: "bottom",
  //     hintTextColor: {
  //       default: "#C8C9CC"
  //     },
  //     hintFontType: "Arial",
  //     hintUseProgressiveFontSize: true,
  //     hintProgressiveFontSizeMultiplier: 1.0,
  //     hintFontSize: 25,
  //     hintCloudColor: {
  //       default: "#2D312F"
  //     },

  //     videoUploadProgressBar: true,
  //     videoUploadProgressBarColor1: "#FFEA82",
  //     videoUploadProgressBarColor2: "#eee"
  //   },

  //   hints: {
  //     // Hints
  //     noHint: "",
  //     noHintPrimary: "",
  //     noHintDetailed: "",

  //     noFace: "Вас Не Видно",
  //     noFacePrimary: "Вас Не Видно",
  //     noFaceDetailed: "",

  //     badLight: "Выравните Освещение",
  //     badLightPrimary: "Выравните Освещение",
  //     badLightDetailed: "",

  //     closer: "Ближе",
  //     closerPrimary: "Поместите лицо в овал",
  //     closerDetailed: "",

  //     closerOvalTransitionPrimary: "Поднесите телефон ближе",
  //     closerOvalTransitionDetailed: "",

  //     away: "Отдалитесь",
  //     awayPrimary: "Поместите лицо в овал",
  //     awayDetailed: "",

  //     closerToCenter: "Ближе к Центру Экрана",
  //     closerToCenterPrimary: "Поместите лицо в овал",
  //     closerToCenterDetailed: "",

  //     targetLeft: "Медленно Поворачивайте Голову Влево",
  //     targetLeftPrimary: "Налево",
  //     targetLeftDetailed: "Медленно Поворачивайте Голову Влево",

  //     targetRight: "Медленно Поворачивайте Голову Вправо",
  //     targetRightPrimary: "Направо",
  //     targetRightDetailed: "Медленно Поворачивайте Голову Вправо",

  //     targetCenter: "Посмотрите Прямо",
  //     targetCenterPrimary: "",
  //     targetCenterDetailed: "",

  //     lookWait: "Смотрите Прямо и Подождите",
  //     lookWaitPrimary: "Отлично!",
  //     lookWaitDetailed: "",

  //     waitForProcessing: "Подождите, идет обработка...",
  //     waitForProcessingPrimary: "Почти закончили",
  //     waitForProcessingDetailed: "Подождите немного, мы кое-что\nпроверяем",

  //     sessionSuccess: "Вы Прошли!",
  //     sessionSuccessPrimary: "Вы Настоящий!",
  //     sessionSuccessDetailed: "",

  //     actionSuccessPrimary: "Отлично!",
  //     actionSuccessDetailed: "",

  //     sessionFailure: "Вы Не Прошли!",
  //     sessionFailurePrimary: "Живость не подтверждена",
  //     sessionFailureDetailed:
  //       "Попробуйте, еще раз. Постарайтесь\n снимать с хорошим освещением",

  //     sessionError: "Произошла какая-то ошибка.\nПопробуйте перезапустить",
  //     sessionErrorPrimary: "Ошибка",
  //     sessionErrorDetailed:
  //       "Произошла какая-то ошибка.\nПопробуйте перезапустить",

  //     clickMe: "Нажмите",

  //     // Errors
  //     NotSupportedBrowserError:
  //       "Ваш браузер не поддерживается. Пожалуйста, используйте последние браузера Chrome, Firefox, Safari или Edge.",
  //     NoWrapperError: "Что-то не так, попробуйте позже",

  //     CameraNotFoundError:
  //       "Веб-камера не найдена. Пожалуйста, подсоедините веб-камеру к устройству и обновите эту страничку.",
  //     CameraNotAllowedError:
  //       "Отказано в доступе к веб-камере. Пожалуйста, обновите эту страничку и разрешите доступ к веб-камере.",
  //     CameraOverconstrainedError:
  //       "Веб-камера с минимальным разрешением 480p не найдена. Пожалуйста, подсоедините веб-камеру 480p (или выше) и обновите эту страничку.",
  //     CameraSecurityError:
  //       "Ваш браузер отказал в доступе к веб-камере. Пожалуйста, измените настройки доступа к веб-камере в Вашем браузере.",
  //     CameraNotReadableError:
  //       "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
  //     CameraAbortError:
  //       "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
  //     CameraBrowserAppNeedsConstantCameraPermission:
  //       "Скорее всего вашему браузеру нужно больше прав на камеру. Пожалуйста используйте последние браузера Chrome, Firefox, Safari или следуйте инструкции чтобы дать больше прав https://s3.eu-central-1.amazonaws.com/verilive-statics.verigram.ai/android_camera_permission_instruction.pdf",
  //     CameraVirtualSuspected: "Что-то странное с вашей камерой.",

  //     CameraStreamInterrupted: "Работа камеры прервалась.",
  //     CameraStreamInterruptedPrimary: "Ошибка",
  //     CameraStreamInterruptedDetailed: "Работа камеры прервалась",

  //     SlowInternetError:
  //       "Плохое соединение. Попробуйте подключиться к более быстрому интернету",
  //     SlowInternetErrorPrimary: "Ошибка",
  //     SlowInternetErrorDetailed:
  //       "Плохое соединение. Попробуйте подключиться\nк более быстрому интернету",

  //     ServerWorkError: "Что-то не так с сервером, попробуйте еще раз",
  //     ServerWorkErrorPrimary: "Ошибка",
  //     ServerWorkErrorDetailed: "Проблема с сервером, попробуйте еще раз",

  //     ServerAuthorizationError: "Что-то не так, попробуйте позже",
  //     ServerAuthorizationErrorPrimary: "Ошибка",
  //     ServerAuthorizationErrorDetailed: "Сервис не авторизован",

  //     ServerConnectionError:
  //       "Сервер не доступен. Проверьте интернет, попробуйте поменять сеть, выключить VPN",
  //     ServerConnectionErrorPrimary: "Ошибка",
  //     ServerConnectionErrorDetailed:
  //       "Сервер не доступен. Проверьте интернет,\n попробуйте поменять сеть, выключить VPN",

  //     ClientWorkError: "Что-то не так, попробуйте еще раз",
  //     ClientWorkErrorPrimary: "Ошибка",
  //     ClientWorkErrorDetailed: "Ошибка на клиенте, попробуйте еще раз"
  //   }
  // }
  // useEffect(() => {
  //   window.verilive
  //     .init(
  //       // "https://s3.eu-central-1.amazonaws.com/verilive-statics.verigram.ai/verilive-v1.15.x.js",
  //       "https://services.verigram.ai:8443/s/verilive/verilive",
  //       ""
  //       // config
  //     )
  //     .then(() => {
  //       console.log("Successful initialization")
  //       console.log(window.verilive.isCameraInitialized())

  //       // Successful initialization. Now you can start liveness process.
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //       // e.g., Show error to user
  //     })
  // })
  return (
    <div className="App">
      App<div id="id_verilive"></div>
    </div>
  )
}

export default App
