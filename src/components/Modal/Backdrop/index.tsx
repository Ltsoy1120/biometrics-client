import styles from "./style.module.scss"

const Backdrop = ({ close }) => {
  return <div className={styles.backdrop} onClick={close}></div>
}
export default Backdrop
