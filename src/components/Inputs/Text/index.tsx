import { useEffect, useState } from "react";

const TextInput = ({ id, id2, id3, type, placeholder, ...props }: any) => {
  const [textBoxValue, setTextBoxValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [messageShown, setMessageShown] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  useEffect(() => {
    const condition = type === "password";
    setIsPassword(condition);
    setMessageShown(!condition);
    console.log(condition, "test");
  }, []);
  return (
    <div
      id={id2}
      style={{
        width: "100%",
        height: "60px",
        borderRadius: "10px",
        border: "1px solid rgba(187, 107, 217, 1)",
        display: "flex",
        alignItems: "center",
        padding: "12px",
        transition: "0.3s",
        cursor: "text",
        position: "relative",
      }}
      onClick={() => {
        const textInput = document.getElementById(id);

        if (textInput !== null) {
          textInput.focus();
        }
      }}
      onMouseEnter={(e: any) => {
        const textInput = document.getElementById(id);
        const parentElement = document.getElementById(id2);
        if (parentElement !== null && textInput !== null) {
          if (document.activeElement !== textInput) {
            parentElement.style.border = "1px solid #195FC2";
          }
        }
      }}
      onMouseLeave={(e: any) => {
        const textInput = document.getElementById(id);
        const parentElement = document.getElementById(id2);
        if (parentElement !== null && textInput !== null) {
          if (document.activeElement !== textInput) {
            if (textBoxValue === "") {
              parentElement.style.border = "1px solid rgba(187, 107, 217, 1)";
            } else {
              parentElement.style.border = "1px solid #fff";
            }
          }
        }
      }}
    >
      <div
        id={id3}
        style={{
          transition: "0.3s",
          color: "#fff",
          fontSize: "14px",
          background: "linear-gradient(180deg, #BB6BD9 0%, #6B7DD9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {placeholder ? placeholder : "Label"}
      </div>
      <input
        onChange={(e: any) => {
          setTextBoxValue(e.target.value);
        }}
        onFocus={() => {
          setFocused(true);
          const parentElement = document.getElementById(id2);
          const textInput = document.getElementById(id);
          const label = document.getElementById(id3);
          if (parentElement !== null && label !== null && textInput !== null) {
            parentElement.style.border = "1px solid #fff";
            if (textBoxValue === "") {
              parentElement.style.border = "1px solid #fff";
              label.style.color = "#fff";
              label.style.background = "transparent";
              label.style.backgroundClip = "";
              label.style.webkitTextFillColor = "";
              label.style.marginTop = "-30px";
              textInput.style.marginTop = "15px";
              if (!label.innerHTML.includes(":")) {
                label.innerHTML = label.innerHTML + ":";
              }
            }
          }
        }}
        onBlur={() => {
          setFocused(false);
          const parentElement = document.getElementById(id2);
          const textInput = document.getElementById(id);
          const label = document.getElementById(id3);
          if (parentElement !== null && label !== null && textInput !== null) {
            parentElement.style.border = "1px solid rgba(187, 107, 217, 1)";
            if (textBoxValue === "") {
              label.style.color = "#fff";
              label.style.background =
                "linear-gradient(180deg, #BB6BD9 0%, #6B7DD9 100%)";
              label.style.backgroundClip = "text";
              label.style.webkitTextFillColor = "transparent";
              label.style.marginTop = "0px";
              textInput.style.marginTop = "0px";
              if (label.innerHTML.includes(":")) {
                label.innerHTML = label.innerHTML.replace(":", "");
              }
            }
          }
        }}
        id={id}
        type={messageShown ? "text" : "password"}
        style={{
          background: "transparent",
          border: "0",
          position: "absolute",
          width: "85%",
          height: "60px",
          fontSize: "22px",
          fontWeight: "600",
          color: "#fff",
          transition: "0.3s",
        }}
      />
      <div style={{ position: "absolute", right: "20px" }}>
        {(() => {
          let response: any;
          if (type === "email") {
            response = (
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4L10 9L2 4V2L10 7L18 2M18 0H2C0.89 0 0 0.89 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 0.89 19.1 0 18 0Z"
                  fill={focused ? "#fff" : "url(#paint0_linear_814_358)"}
                  style={{ transition: "0.3s" }}
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_814_358"
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#BB6BD9" />
                    <stop offset="1" stop-color="#6B7DD9" />
                  </linearGradient>
                </defs>
              </svg>
            );
          } else if (type === "password") {
            response = (
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14C10 12.89 9.1 12 8 12C7.46957 12 6.96086 12.2107 6.58579 12.5858C6.21071 12.9609 6 13.4696 6 14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16ZM14 7C14.5304 7 15.0391 7.21071 15.4142 7.58579C15.7893 7.96086 16 8.46957 16 9V19C16 19.5304 15.7893 20.0391 15.4142 20.4142C15.0391 20.7893 14.5304 21 14 21H2C1.46957 21 0.960859 20.7893 0.585786 20.4142C0.210714 20.0391 0 19.5304 0 19V9C0 7.89 0.9 7 2 7H3V5C3 3.67392 3.52678 2.40215 4.46447 1.46447C5.40215 0.526784 6.67392 0 8 0C8.65661 0 9.30679 0.129329 9.91342 0.380602C10.52 0.631876 11.0712 1.00017 11.5355 1.46447C11.9998 1.92876 12.3681 2.47995 12.6194 3.08658C12.8707 3.69321 13 4.34339 13 5V7H14ZM8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5V7H11V5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2Z"
                  fill={focused ? "#fff" : "url(#paint0_linear_821_695)"}
                  style={{ transition: "0.3s" }}
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_821_695"
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#BB6BD9" />
                    <stop offset="1" stop-color="#6B7DD9" />
                  </linearGradient>
                </defs>
              </svg>
            );
          }
          return response;
        })()}
      </div>
      <div
        style={{
          position: "absolute",
          right: "55px",
          marginTop: "4px",
          cursor: "pointer",
          width: isPassword ? "" : "0px",
          alignItems: "center",
          justifyContent: "center",
          opacity: isPassword ? "1" : "0",
        }}
        onClick={() => {
          setMessageShown(!messageShown);
        }}
      >
        {messageShown ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9573 9.47363C12.7529 9.47363 13.516 9.7897 14.0786 10.3523C14.6412 10.9149 14.9573 11.678 14.9573 12.4736C14.9573 13.2693 14.6412 14.0323 14.0786 14.595C13.516 15.1576 12.7529 15.4736 11.9573 15.4736C11.1616 15.4736 10.3986 15.1576 9.83595 14.595C9.27335 14.0323 8.95728 13.2693 8.95728 12.4736C8.95728 11.678 9.27335 10.9149 9.83595 10.3523C10.3986 9.7897 11.1616 9.47363 11.9573 9.47363ZM11.9573 4.97363C16.9573 4.97363 21.2273 8.08363 22.9573 12.4736C21.2273 16.8636 16.9573 19.9736 11.9573 19.9736C6.95728 19.9736 2.68728 16.8636 0.957275 12.4736C2.68728 8.08363 6.95728 4.97363 11.9573 4.97363ZM3.13728 12.4736C4.78728 15.8336 8.19728 17.9736 11.9573 17.9736C15.7173 17.9736 19.1273 15.8336 20.7773 12.4736C19.1273 9.11363 15.7173 6.97363 11.9573 6.97363C8.19728 6.97363 4.78728 9.11363 3.13728 12.4736Z"
              fill={focused ? "#fff" : "url(#paint0_linear_680_1319)"}
            />
            <defs>
              <linearGradient
                id="paint0_linear_680_1319"
                x1="11.9573"
                y1="4.97363"
                x2="11.9573"
                y2="19.9736"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#BB6BD9" />
                <stop offset="1" stop-color="#6B7DD9" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.35 14.94 12.69 14.83 13L11 9.17C11.31 9.06 11.65 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.18 14.08 20.79 15.88 19 17.19L17.58 15.76C18.94 14.82 20.06 13.54 20.82 12C19.17 8.64 15.76 6.5 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C4.83 15.36 8.24 17.5 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C10.29 14.85 9.15 13.71 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z"
              fill={focused ? "#fff" : "url(#paint0_linear_821_680)"}
            />
            <defs>
              <linearGradient
                id="paint0_linear_821_680"
                x1="12"
                y1="4"
                x2="12"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#BB6BD9" />
                <stop offset="1" stop-color="#6B7DD9" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
};

export default TextInput;
