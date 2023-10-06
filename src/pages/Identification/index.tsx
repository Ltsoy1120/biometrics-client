import React, { useState, useEffect } from "react"
import IinIdentification from "../../containers/IInIdentification"
import VideoIdentification from "../../containers/VideoIdentification"
import { IStartLivenessSessionDTO } from "../../models/liveness"
import { livenessService } from "../../services/liveness.service"

const Identification = () => {
  const [state, setState] = useState<IStartLivenessSessionDTO>({
    token: "12345",
    iin: "",
    livenessVendorName: "verigram"
  })

  useEffect(() => {
    livenessService.livenessStart(state)
  }, [state])

  const iinHandler = (iin: string) => {
    setState(prevState => ({
      ...prevState,
      iin
    }))
  }
  console.log("state", state)
  return (
    <>
      {!state.iin && <IinIdentification iinHandler={iinHandler} />}
      {state.token && state.iin && <VideoIdentification state={state} />}
    </>
  )
}

export default Identification
