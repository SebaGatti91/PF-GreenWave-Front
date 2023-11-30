import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/images/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                seba.g.1391@gmail.com
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>30.11.2023</td>
            <td>$5.500</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/images/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
               seba.g.1391@gmail.com
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>25.11.2023</td>
            <td>$1.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/images/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                seba.g.1391@gmail.com
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelled
              </span>
            </td>
            <td>23.11.2023</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/images/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                seba.g.1391@gmail.com
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>20.11.2023</td>
            <td>$1.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;