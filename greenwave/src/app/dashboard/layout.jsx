// "use client";
import SideBar from "../components/dashboard/sideBar/SideBar";
import NavBar from "../components/dashboard/navBar/NavBar";
import styles from "../components/dashboard/dashboard.module.css";
import { useContext } from "react";
// import { GlobalUser } from "../components/users/globalUsers";
// import { useRouter } from "next/navigation";
const Layout = ({ children }) => {
  // const { user } = useContext(GlobalUser);
  // const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <NavBar />
        {children}
      </div>
    </div>
    // <>
    //   {user?.admin === true ? (
    //   ) : (
    //     router.push("/404page")
    //   )}
    // </>
  );
};

export default Layout;
