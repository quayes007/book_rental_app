import Card from "../ui/dashboard/card/card";
import Borrow from "../ui/dashboard/borrow/borrow";
import OrderList from "../ui/dashboard/orderList/orderList"; 
import styles from "../ui/dashboard/dashboard.module.css";

const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10
    },
    {
      id: 2,
      title: "Borrowed books count",
      number: 8
    },
    {
      id: 3,
      title: "Sold books count",
      number: 6,
    },
  ];

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                {cards.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
                </div>
                <Borrow />
                <OrderList />
            </div>
        </div>
    )
}

export default Dashboard;