import React, { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import { IVeriliveResult } from "../../interfaces"
import { IStartLivenessSessionDTO } from "../../models/liveness"
import { livenessService } from "../../services/liveness.service"
import { verigramService } from "../../services/verigram.service"
import "./style.scss"

interface VideoIdentificationProps {
  state: IStartLivenessSessionDTO
}

const VideoIdentification = ({ state }: VideoIdentificationProps) => {
  // const api_secret = "f0cc9600aec5a984baa889240e9e0e94"
  const personID = "000001"

  const [accessToken, setAccessToken] = useState("")
  console.log("accessToken", accessToken)
  const [veriliveResults, setVeriliveResults] = useState()
  console.log("veriliveResults", veriliveResults)
  const navigate = useNavigate()

  useEffect(() => {
    const getAccessToken = async () => {
      await fetch(
        `https://dev.verilive.verigram.ai:5001/paydala?person_id=${personID}`
      )
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token))
    }
    getAccessToken()
    // const response = livenessService.livenessStart(state)
    // setAccessToken(response.vendorParameters.access_token)
  }, [personID])

  useEffect(() => {
    const runVeriliveHandler = async () => {
      const verilive = window.verilive

      verigramService.run(accessToken, personID, openModal)
      verilive.successCallback = async function (result: any) {
        console.log("successCallback", result)
        console.log("sessionId", result.session_id)
        setVeriliveResults(result)
        successCallback(result)
        await verilive.dispose()
      }
      verilive.failCallback = async function (result: any) {
        console.log("failCallback", result)
        console.log("errors", verilive.errors)
        setVeriliveResults(result)
        failCallback(result)
        await verilive.dispose()
      }
      verilive.errorCallback = async function (result: any) {
        console.log("errorCallback", result)
        errorCallback(result)
        await verilive.dispose()
      }
      console.log("errors", verilive.errors)

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

  // для модалки
  const [showModal, setShowModal] = useState({
    show: false,
    message: ""
  })
  const openModal = (message: string) => {
    setShowModal({ show: true, message })
  }
  const closeModal = () => {
    setShowModal({ show: false, message: "" })
  }
  const modalBody = (
    <>
      <h3>Ошибка!</h3>
      <p>{showModal.message}</p>
    </>
  )

  return (
    <>
      {/* <div id="id_verilive"></div> */}
      {showModal.show && <Modal body={modalBody} close={closeModal} />}
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
