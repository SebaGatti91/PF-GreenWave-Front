import styles from "../components/dashboard/dashboard.module.css";
import Card from "../components/dashboard/card/Card";
import Transactions from "../components/dashboard/transactions/Transactions"



const Dashboard = () => {
  const users = {
    title: "Users",
    number: 1100,
    change: 10,
  };
  const products= {
    title: "Products",
    number: 3165,
    change: -5,
  };
  const reciclyng= {
    title: "Reciclyng Points",
    number: 100,
    change: 3,
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card item={users} />
          <Card item={products} />
          <Card item={reciclyng} />
        </div>
        <Transactions/>
        {/* <Chart/> */}
      </div>
    </div>
  );
};

export default Dashboard;
