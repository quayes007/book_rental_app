
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
  } from "react-icons/md";
import { FaBookOpen, FaBookReader } from "react-icons/fa";


const menuItems = [
    {
      title: "Modules",
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
          title: "Books",
          path: "/dashboard/books",
          icon: <FaBookOpen />,
        },
        {
          title: "Borrowed Book",
          path: "/dashboard/borrow-list",
          icon: <FaBookReader />,
        },
        {
            title: "Ordered Book",
            path: "/dashboard/order-list",
            icon: <MdShoppingBag />,
          },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];
  
const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                className={styles.userImage}
                src={"/avatar.png"}
                alt=""
                width="50"
                height="50"
                />
                <div className={styles.userDetail}>
                <span className={styles.username}>John Doe</span>
                <span className={styles.userTitle}>Admin</span>
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
        <button className={styles.logout}>
            <MdLogout />
            Logout
          </button>
        </div>
    )
}

export default Sidebar;
