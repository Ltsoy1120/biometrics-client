import React from "react"
import styles from "./style.module.scss"

interface BackdropProps {
  close: any
}

const Backdrop = ({ close }: BackdropProps) => {
  return <div className={styles.backdrop} onClick={close}></div>
}
export default Backdrop
