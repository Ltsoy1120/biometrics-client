import React, { Fragment } from "react"
import Remove from "./Remove"
import Backdrop from "./Backdrop"
import styles from "./style.module.scss"

interface ModalProps {
  body: any
  close: any
}

const Modal = ({ body, close }: ModalProps) => {
  return (
    <Fragment>
      <Backdrop close={close} />
      <div className={styles.modal}>
        <div className={styles.container}>
          {body}
          <Remove onClick={close} />
        </div>
      </div>
    </Fragment>
  )
}

export default Modal
