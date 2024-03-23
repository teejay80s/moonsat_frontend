import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import "../../shared/button.css";
import moonsatLogo from "../../assets/moonsat-no-bg.png";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.home}>
        <nav className={styles.homeNav}>
          <div></div>
          <div className={styles.admin} style={{ marginRight: "" }}>
            <Link to={"/login"}>Login</Link>
          </div>
        </nav>

        <main>
          <div className={styles.title}>
            <div className={styles.logo}>
              <img src={moonsatLogo} alt="moonsat-logo" />
            </div>
            <h1>
              MoonSat
              <i
                style={{
                  marginLeft: "10px",
                  color: "#9C1717",
                  textDecoration: "italics",
                }}
              >
                Technology
              </i>
              <br />
            </h1>
            <p>
              Moonsat Technology partners with non-technical founders and
              business owners to help them build and manage their software
              solutions in exchange for equity or cash. We help SMEs and
              businesses to overcome technology challenges and elevate their
              value through custom software development, product design, QA and
              consultancy services.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
