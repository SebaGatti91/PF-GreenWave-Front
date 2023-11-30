import SideBar from "../components/dashboard/sideBar/SideBar"
import NavBar from "../components/dashboard/navBar/NavBar"
import styles from "../components/dashboard/dashboard.module.css"

const Layout = ({children}) => {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <SideBar/>
        </div>
        <div className={styles.content}>
          <NavBar/>
          {children}
        </div>
      </div>
    )
  }
  
  export default Layout