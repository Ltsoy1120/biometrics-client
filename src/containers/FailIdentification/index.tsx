import React from "react"
import { useNavigate } from "react-router"
import Button from "../../components/Button"
import "./style.scss"

const FailIdentification = () => {
  const navigate = useNavigate()
  const tryAgainHandler = () => {
    navigate("/video-identification")
  }
  const cancelHandler = () => {
    navigate("/")
  }
  return (
    <div className="identification">
      <img src="/static/images/wrong.png" alt="wrong" />
      <h1>К сожалению, мы не смогли вас идентифицировать</h1>
      <Button onClick={() => tryAgainHandler()} width={328}>
        Попробобовать еще раз
      </Button>
      <Button onClick={() => cancelHandler()} width={328}>
        Отменить
      </Button>
    </div>
  )
}

export default FailIdentification
