import styles from "./orderList.module.css";
import Image from "next/image";
import { processRequest } from "../../../lib/action"

const OrderList = ({ item }) => {
  return (
    <div className={styles.container}>
      {
        !item && (<h2 className={styles.title}>Latest Ordered Books</h2>) 
      }
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
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
          <td>{item?.id || 1 }</td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                {item?.user?.name || "John Doe"}
              </div>
            </td>
           
            <td>
              {item?.title || "Title"}
            </td>
            <td>{item?.price || 250}</td>
            <td>{item?.platformCost || 13}</td>
            <td>{item?.totalCost || 263}</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                {item?.status || "Processing"}
              </span>
            </td>
            <td>
            {
              item && item?.status != 'complete' && (
                <form action={processRequest}>
                  <input type="hidden" name="id" value={(item.id)} />
                  <button type="submit" className={`${styles.button} ${styles.delete}`}>
                    Complete
                  </button>
                </form>
              )
            }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
