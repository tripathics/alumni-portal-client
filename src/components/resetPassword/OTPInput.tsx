import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { RecoveryContext } from "@/App";

export default function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState<number>(60);
  const [OTPinput, setOTPinput] = useState<string[]>(["0", "0", "0", "0"]);
  const [disable, setDisable] = useState<boolean>(true);

  function resendOTP() {
    if (disable || !email || !otp) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => {
        setDisable(true);
        alert("A new OTP has been sent to your email.");
        setTimer(60);
      })
      .catch(console.log);
  }

  function verifyOTP() {
    const inputOTP = parseInt(OTPinput.join(""));
    if (inputOTP === otp) {
      setPage("reset");
    } else {
      alert(
        "The code you have entered is not correct, try again or re-send the link"
      );
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"></div>
    </div>
  );
}
