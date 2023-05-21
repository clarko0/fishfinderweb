import { AuthApi } from "@/api/src/internal/src/auth.api";
import { Loading, Modal } from "@nextui-org/react";
import React, { useState } from "react";

const AuthenticateEmailModal = ({
  is_open,
  email,
  handleEmailPasscode,
  otp,
  activeOTPIndex,
  inputRef,
  handleKeyDown,
  isloading,
  handleBackButton,
  handlePaste,
  otpWrong,
  countDown,
  handleResendVerification,
  otpKeyTimeout,
}: any) => {
  const [pasting, setPasting] = useState<boolean>(false);
  return (
    <Modal
      blur
      open={is_open}
      preventClose
      width="400px"
      css={{
        background: "#0A0808",
        fontFamily: "inter",
        userSelect: "none",
        height: "300px",
      }}
    >
      <svg
        onClick={() => {
          handleBackButton();
        }}
        width="20"
        height="15"
        viewBox="0 0 15 10"
        fill="none"
        style={{
          position: "absolute",
          cursor: "pointer",
          right: "30px",
          zIndex: "999",
          top: "30px",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5L1.29289 4.29289L0.585786 5L1.29289 5.70711L2 5ZM14 6C14.5523 6 15 5.55228 15 5C15 4.44772 14.5523 4 14 4V6ZM5.29289 0.292893L1.29289 4.29289L2.70711 5.70711L6.70711 1.70711L5.29289 0.292893ZM1.29289 5.70711L5.29289 9.70711L6.70711 8.29289L2.70711 4.29289L1.29289 5.70711ZM2 6H14V4H2V6Z"
          fill="white"
        />
      </svg>

      <svg
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", left: "35px", top: "35px" }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.00441946 4.6663C0.332196 4.66673 0.664465 4.7479 0.971286 4.91835L20 15.4899L39.0287 4.91835C39.3355 4.7479 39.6678 4.66673 39.9956 4.66631C39.9742 2.70269 39.8495 1.60681 39.1213 0.87868C38.2426 0 36.8284 0 34 0H6C3.17157 0 1.75736 0 0.87868 0.87868C0.150549 1.60681 0.0257943 2.70269 0.00441946 4.6663ZM40 8.95459L21.4569 19.2563C20.5509 19.7597 19.4491 19.7597 18.5431 19.2563L0 8.95458V25.1111C0 27.9395 0 29.3538 0.87868 30.2324C1.75736 31.1111 3.17157 31.1111 6 31.1111H34C36.8284 31.1111 38.2426 31.1111 39.1213 30.2324C40 29.3538 40 27.9395 40 25.1111V8.95459Z"
          fill="white"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: "35px",
          display: otpKeyTimeout ? "none" : "flex",
          fontWeight: "600",
          fontSize: "18px",
          top: "75px",
        }}
      >
        Please check your email
      </div>
      <div
        style={{
          position: "absolute",
          left: "35px",
          fontWeight: "500",
          fontSize: "12px",
          top: "102px",
          color: "#949494",
          display: otpKeyTimeout ? "none" : "flex",
        }}
      >
        We&apos;ve sent you a 6 digit code
      </div>
      <div
        style={{
          display: otpWrong && !otpKeyTimeout ? "flex" : "none",
          color: "red",
          width: "100%",
          fontSize: "12px",
          justifyContent: "center",
          top: "130px",
          position: "absolute",
        }}
      >
        Invalid Code
      </div>
      <div
        style={{
          display: otpKeyTimeout ? "flex" : "none",
          position: "absolute",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
          fontWeight: "600",
          height: "100%",
        }}
      >
        Email verification code expired
        <div
          style={{
            fontWeight: "500",
            fontSize: "12px",
            color: "#949494",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            handleResendVerification();
          }}
        >
          Click to send a new one
        </div>
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "500",
          top: "220px",
          position: "absolute",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: otpKeyTimeout ? "none" : "flex",
          gap: "3px",
        }}
      >
        Code expires in <span>00:{countDown.toString().padStart(2, "0")}</span>
      </div>
      {!isloading && (
        <>
          <div
            style={{
              display: otpKeyTimeout ? "none" : "flex",
              gap: "7px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "160px",
            }}
          >
            {otp.map((_: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <input
                    ref={index === activeOTPIndex ? inputRef : null}
                    type="number"
                    style={{
                      transition: "0.3s",
                      width: "40px",
                      height: "40px",
                      border: "1px solid grey",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "500",
                      opacity: "0.5",
                      background: "transparent",
                    }}
                    value={otp[index]}
                    onFocus={(e: any) => {
                      e.target.style.border = "1px solid #fff";
                      e.target.style.opacity = "1";
                    }}
                    onKeyDown={(e: any) => {
                      if (!(index === 0 && e.key === "Backspace")) {
                        e.target.style.border = "1px solid grey";
                        e.target.style.opactity = "0.5";
                      }
                      handleKeyDown(e, index);
                    }}
                    onPaste={(e: any) => {
                      handlePaste(e);
                    }}
                    className="numberInput"
                    onChange={handleEmailPasscode}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
      <Loading
        style={{ marginTop: "180px", display: isloading ? "flex" : "none" }}
        size="lg"
        loadingCss={{ background: "transparent" }}
      />
    </Modal>
  );
};

export default AuthenticateEmailModal;
