import styles from "./orderList.module.css";
import Image from "next/image";

const OrderList = ({ item }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Ordered Books</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Book Title</td>
            <td>Price</td>
            <td>Platform Cost</td>
            <td>Total Cost</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              Title
            </td>
            <td>250</td>
            <td>13</td>
            <td>263</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Processing
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
