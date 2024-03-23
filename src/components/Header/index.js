import React from "react";
import { Avatar } from "../Avatar";
import styles from "./styles.module.css";

import { useGetMe } from "../../modules/Auth/hooks";

const Header = ({ title }) => {
  const data = useGetMe();

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <b>
          <i>Hello</i>
        </b>
        , {data?.data?.name}
      </div>

      <div className={styles.user}>
        <div className={styles.profile}>
          <img
            src={
              data?.data?.photo ? data?.data?.photo : Avatar(data?.data?.gender)
            }
            alt="DP"
          />
        </div>
        <div className={styles.name}> {data?.data?.name}</div>
      </div>
    </div>
  );
};

export default Header;
