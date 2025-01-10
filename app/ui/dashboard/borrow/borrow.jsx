import styles from "./borrow.module.css";
import Image from "next/image";

const Borrow = ({ item }) => {
  return (
    <div className={styles.container}>
      {
        !item && (<h2 className={styles.title}>Latest Ordered Books</h2>) 
      }
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Book Title</td>
            <td>From Date</td>
            <td>To Date</td>
            <td>Rent Per Day</td>
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
                {item?.name || "John Doe"}
              </div>
            </td>
            <td>
              {item?.title || "Title" }
            </td>
            <td>{item?.startDate || "14.02.2025"}</td>
            <td>{item?.endDate || "18.02.2025"}</td>
            <td>{item?.rentPerDay || "5"}</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                {item?.status || "Processing"}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Borrow;
