"use client";
import Image from "next/image";
import MenuLink from "./menuLink/MenuLink";
import styles from "./sidebar.module.css";
import { GlobalUser } from "../../users/globalUsers";
import Link from "next/link";
import { useContext } from "react";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdOutlineSettings,
  MdHelpCenter,
  MdNature,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      // {
      //   title: "Recycling",
      //   path: "/dashboard/recycling",
      //   icon: <MdNature />,
      // },
      // {
      //   title: "Transactions",
      //   path: "/dashboard/transactions",
      //   icon: <MdAttachMoney />,
      // },
    ],
  },
  // {
  //   title: "Analytics",
  //   list: [
  //     {
  //       title: "Revenue",
  //       path: "/dashboard/revenue",
  //       icon: <MdWork />,
  //     },
      // {
      //   title: "Reports",
      //   path: "/dashboard/reports",
      //   icon: <MdAnalytics />,
      // },
  //   ],
  // },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/dashboard/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/dashboard/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const Sidebar = () => {
  const { user } = useContext(GlobalUser);
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user.image || "/images/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>
            {user.admin ? "Administrator" : "User"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <div className={styles.buttons}>
        <Link href={`/homepage`}>
          <button className={`${styles.button}`}>Exit</button>
        </Link>
      </div> 
    </div>
  );
};

export default Sidebar;
