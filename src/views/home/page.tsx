import PageHeader from "../../components/layouts/PageHeader/PageHeader";
import styles from "./Home.module.scss";
import cx from "classnames";

const Home: React.FC = () => {
  return (
    <>
      <PageHeader bgImage="hero.png">
        <div className={cx(styles.header)}>
          <div className={styles["header-content"]}>
            <h1 className={styles.heading}>
              Celebrating the 10th convocation of NIT Arunachal Pradesh
            </h1>
            <p>
              On December 19, we welcomed approximately 200, 2023 graduates to
              the 10th convocation ceremony of the National Institute of
              Technology Arunachal Pradesh
            </p>
          </div>
        </div>
      </PageHeader>
      <div className="__page-content container">
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
