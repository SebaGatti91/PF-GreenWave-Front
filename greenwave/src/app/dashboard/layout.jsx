"use client";
import SideBar from "../components/dashboard/sideBar/SideBar";
import NavBar from "../components/dashboard/navBar/NavBar";
import styles from "../components/dashboard/dashboard.module.css";
import { GlobalUser } from "../components/users/globalUsers";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
const Layout = ({ children }) => {
  const { user } = useContext(GlobalUser);
  const router = useRouter();

  useEffect(() => {
    if (user.admin === false) {
      return router.push("/404page");
    }
  }, []);
  return (
    <>
      {user.admin === true ? (
        <div className={styles.container}>
          <div className={styles.menu}>
            <SideBar />
          </div>
          <div className={styles.content}>
            <NavBar />
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Layout;
