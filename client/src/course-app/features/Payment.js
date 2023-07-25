import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import { CheckCircle } from "@mui/icons-material";
import { payment } from "./users/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Payment() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  console.log("payment component");
  useEffect(function () {
    if (user.isPaymentDone) dispatch(payment(navigate));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.countdown}>Redirecting you in {user.count}s</div>
        <div>
          <CheckCircle className={styles.icon} fontSize="large" />
          <div className={styles.message}>Payment Successful</div>
          <div className={styles.subMessage}>Thank you for your purchase!</div>
        </div>
      </div>
    </>
  );
}
