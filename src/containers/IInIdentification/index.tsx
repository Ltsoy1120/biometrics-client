import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import "./style.scss"

interface IUserData {
  tokenPd?: string
  iin: string
}
const IinIdentification = () => {
  const [state, setState] = useState<IUserData>({ tokenPd: "", iin: "" })
  const [validation, setValidation] = useState<{
    isValid: boolean
    message: string
  } | null>()
  const navigate = useNavigate()

  useEffect(() => {
    const iinValidation = () => {
      const regex = /^[0-9]{12}$/
      if (state.iin.length > 12 || !state.iin.match(regex)) {
        setValidation({
          isValid: false,
          message: "ИИН должен содержать 12 цифр"
        })
      } else if (state.iin.length === 12 && !!state.iin.match(regex)) {
        setValidation({
          isValid: true,
          message: ""
        })
      }
    }
    iinValidation()
  }, [state.iin])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const showResults = () => {}

  const continueHandler = () => {
    console.log("click")
    navigate("/video-identification")
  }

  return (
    <>
      <div className="identification">
        <h1>Пройти идентификацию</h1>
        <input name="iin" placeholder="Ваш ИИН" onChange={onChangeHandler} />
        {state.iin.length > 0 && !validation?.isValid && (
          <span>{validation?.message}</span>
        )}
        <Button
          onClick={() => continueHandler()}
          width={328}
          disabled={!validation?.isValid}
        >
          Продолжить
        </Button>
        <p className="agreement">
          Нажимая “Продолжить”, вы соглашаетесь с условиями
          <a href="/registration">публичной оферты.</a>
        </p>
      </div>
    </>
  )
}

export default IinIdentification
