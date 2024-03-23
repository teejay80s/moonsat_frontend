import React, {  useState } from "react";
import styles from "./styles.module.css";
import moonsatlogo from "../../assets/moonsat-no-bg.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Config from "./Config";
import { Avatar } from "../Avatar";
import { useGetMe } from "../../modules/Auth/hooks";

const Navigation = ({ name }) => {
  const [toggle, setToggle] = useState(false);
  const data = useGetMe()
 
  return (
    <>
      <ToastContainer />
      <div className={styles.mobileNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={moonsatlogo} alt="Logo" />
          </Link>
        </div>

        <div className={styles.bars}>
          {toggle ? (
            <FaTimes onClick={() => setToggle(!toggle)} />
          ) : (
            <FaBars onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
      <div className={toggle ? styles.mobileNavigation : styles.navigation}>
        {!toggle && (
          <>
            <div className={styles.logo1}>
              <Link to="/">
                <img src={moonsatlogo} alt="Logo" />
              </Link>
            </div>
            <div className={styles.logo2}>
            <img
            src={data?.data?.photo ? data?.data?.photo : Avatar(data?.data?.gender)}
            alt="DP"
          />
            </div>
            <div className={styles.userName}>
              <h3>{data?.data?.name}</h3>
             
            </div>
          </>
        )}
        <Config name={name} roles={data?.data?.role} />
      </div>
    </>
  );
};

export default Navigation;
