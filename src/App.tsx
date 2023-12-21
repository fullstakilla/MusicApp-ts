import MainPage from "./pages/MainPage/MainPage"
import styles from './global.module.scss'
import Playbar from "./components/Playbar/Playbar"

const App = () => {
  return (
    <div className={styles.wrapper}>
      <MainPage />
      <Playbar />
    </div>
  )
}

export default App
