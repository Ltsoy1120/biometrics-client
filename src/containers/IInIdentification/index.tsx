import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import "./style.scss"

interface IinIdentificationProps {
  iinHandler: (iin: string) => void
}

const IinIdentification = ({ iinHandler }: IinIdentificationProps) => {
  const [iin, setIin] = useState<string>("")
  const [validation, setValidation] = useState<{
    isValid: boolean
    message: string
  } | null>()
  const navigate = useNavigate()

  useEffect(() => {
    const iinValidation = () => {
      const regex = /^[0-9]{12}$/
      if (iin.length > 12 || !iin.match(regex)) {
        setValidation({
          isValid: false,
          message: "ИИН должен содержать 12 цифр"
        })
      } else if (iin.length === 12 && !!iin.match(regex)) {
        setValidation({
          isValid: true,
          message: ""
        })
      }
    }
    iinValidation()
  }, [iin])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIin(event.target.value)
  }

  const showResults = () => {}

  const continueHandler = () => {
    console.log("click")
    iinHandler(iin)
    // navigate("/video-identification")
  }

  return (
    <>
      <div className="identification">
        <h1>Пройти идентификацию</h1>
        <input name="iin" placeholder="Ваш ИИН" onChange={onChangeHandler} />
        {iin.length > 0 && !validation?.isValid && (
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
