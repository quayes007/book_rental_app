import styles from "./borrow.module.css";
import Image from "next/image";

const Borrow = ({ item }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Borrow Requests</h2>
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
                John Doe
              </div>
            </td>
            <td>
              Title
            </td>
            <td>14.02.2025</td>
            <td>18.02.2025</td>
            <td>5</td>
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

export default Borrow;
