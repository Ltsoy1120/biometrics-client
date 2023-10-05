import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import "./style.scss"

interface IUserData {
  tokenPd?: string
  iin: string
}
const SuccessIdentification = () => {
  return (
    <>
      <div className="identification">
        <img src="/static/images/success.png" alt="success" />
        <h1>Успешная идентификация!</h1>
        <p>Здравствуйте, {""}</p>
      </div>
    </>
  )
}

export default SuccessIdentification
