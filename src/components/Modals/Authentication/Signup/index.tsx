import { Button, Input, Modal, Text } from "@nextui-org/react";
import Fish2 from "public/fish-2.png";
import Squid from "public/squid-1.png";

const SignupModal = ({
  is_open,
  signupClicker,
  setSignupClicker,
  setSignupData,
  setIsLogin,
  signup,
  signupHelperEmail,
  signupSamePassword,
  signupSecurePassword,
  signupEmailInUse,
  setIsSignup,
}: any) => {
  return (
    <Modal
      width="900px"
      scroll
      blur
      open={is_open}
      preventClose
      css={{
        background: "#0A0808",
        fontFamily: "inter",
        userSelect: "none",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        style={{
          position: "absolute",
          right: "-100px",
          transition: "0.3s",
        }}
        width="200px"
        src={Fish2.src}
        onMouseEnter={(e: any) => {
          e.target.style.right = "-10px";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.right = "-100px";
        }}
      />
      <img
        width="200px"
        src={Squid.src}
        style={{
          position: "absolute",
          left: "-90px",
          bottom: "0",
          transition: "0.3s",
        }}
        onMouseEnter={(e: any) => {
          e.target.style.left = "-10px";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.left = "-100px";
        }}
      />
      <div
        style={{
          fontSize: "40px",
          fontWeight: "600",
          color: "#fff",
          marginTop: "80px",
        }}
      >
        Sign Up
      </div>
      <div
        style={{
          color: "#949494",
          fontWeight: "600",
          fontSize: "24px",
        }}
      >
        Welcome to Fish Finder
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <Input
          clearable
          bordered
          width="415px"
          color={signupHelperEmail ? "error" : "primary"}
          size="xl"
          placeholder="Email"
          onChange={(e: any) => {
            setSignupClicker(!signupClicker);
            setSignupData((prev: any) => {
              const newData = prev;
              newData.data.email = e.target.value;
              return newData;
            });
          }}
          contentLeft={
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 18H6C3 18 1 16.5 1 13V6C1 2.5 3 1 6 1H16C19 1 21 2.5 21 6V9"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 6.5L12.87 9C12.3265 9.39949 11.6696 9.61493 10.995 9.61493C10.3204 9.61493 9.66353 9.39949 9.12 9L6 6.5M17.7 12.78C17.8468 13.3103 18.1284 13.7935 18.5175 14.1825C18.9065 14.5716 19.3897 14.8532 19.92 15M18.21 12.27L14.671 15.81C14.5191 15.9756 14.4153 16.1796 14.371 16.4L14.181 17.75C14.1572 17.8547 14.1603 17.9637 14.1901 18.0668C14.2198 18.17 14.2753 18.2639 14.3512 18.3398C14.4271 18.4157 14.521 18.4712 14.6242 18.5009C14.7273 18.5307 14.8363 18.5338 14.941 18.51L16.291 18.32C16.5121 18.2779 16.7167 18.1738 16.881 18.02L20.421 14.48C20.5975 14.3537 20.7413 14.1871 20.8406 13.994C20.9398 13.801 20.9916 13.5871 20.9916 13.37C20.9916 13.1529 20.9398 12.939 20.8406 12.746C20.7413 12.5529 20.5975 12.3863 20.421 12.26C20.2942 12.0851 20.1275 11.9428 19.9349 11.8451C19.7422 11.7473 19.529 11.6969 19.3129 11.6978C19.0969 11.6988 18.8842 11.7512 18.6924 11.8507C18.5006 11.9502 18.3352 12.0939 18.21 12.27Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
        <div
          style={{
            fontWeight: "400",
            fontSize: "12px",
            color: "red",
            width: "400px",
            height: "0px",
            display: signupHelperEmail || signupEmailInUse ? "flex" : "none",
            alignItems: "center",
          }}
        >
          {signupEmailInUse
            ? "Email is already in use, please sign in or try another email"
            : "Email is not valid"}
        </div>
        <Input.Password
          bordered
          color={
            signupSamePassword || signupSecurePassword ? "error" : "primary"
          }
          size="xl"
          width="415px"
          css={{ marginTop: "10px" }}
          placeholder="Password"
          onChange={(e: any) => {
            setSignupClicker(!signupClicker);
            setSignupData((prev: any) => {
              const newData = prev;
              newData.data.password = e.target.value;
              return newData;
            });
          }}
          contentLeft={
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.75 6.75V8.85C16.2524 8.78772 15.7515 8.75434 15.25 8.75V6.75C15.25 3.6 14.36 1.5 10 1.5C5.64 1.5 4.75 3.6 4.75 6.75V8.75C4.24849 8.75434 3.74765 8.78772 3.25 8.85V6.75C3.25 3.85 3.95 0 10 0C16.05 0 16.75 3.85 16.75 6.75Z"
                fill="white"
              />
              <path
                d="M16.75 8.85C16.2524 8.78772 15.7515 8.75434 15.25 8.75H4.75C4.24849 8.75434 3.74765 8.78772 3.25 8.85C0.7 9.16 0 10.41 0 13.75V15.75C0 19.75 1 20.75 5 20.75H15C19 20.75 20 19.75 20 15.75V13.75C20 10.41 19.3 9.16 16.75 8.85ZM6.71 15.46C6.51826 15.6426 6.26473 15.7461 6 15.75C5.86932 15.7484 5.74022 15.7212 5.62 15.67C5.49762 15.6217 5.38561 15.5504 5.29 15.46C5.10743 15.2683 5.00388 15.0147 5 14.75C5.00158 14.6193 5.02876 14.4902 5.08 14.37C5.13073 14.2489 5.20175 14.1373 5.29 14.04C5.38561 13.9496 5.49762 13.8783 5.62 13.83C5.80211 13.7534 6.00282 13.7325 6.19681 13.7699C6.3908 13.8072 6.56938 13.9012 6.71 14.04C6.79825 14.1373 6.86927 14.2489 6.92 14.37C6.97124 14.4902 6.99842 14.6193 7 14.75C6.99612 15.0147 6.89257 15.2683 6.71 15.46ZM10.92 15.13C10.8693 15.2511 10.7983 15.3627 10.71 15.46C10.5183 15.6426 10.2647 15.7461 10 15.75C9.73489 15.748 9.48068 15.6442 9.29 15.46C9.20175 15.3627 9.13073 15.2511 9.08 15.13C9.02876 15.0098 9.00158 14.8807 9 14.75C9.00197 14.4849 9.1058 14.2307 9.29 14.04C9.48339 13.8616 9.73687 13.7625 10 13.7625C10.2631 13.7625 10.5166 13.8616 10.71 14.04C10.8942 14.2307 10.998 14.4849 11 14.75C10.9984 14.8807 10.9712 15.0098 10.92 15.13ZM14.71 15.46C14.5204 15.6459 14.2655 15.7501 14 15.7501C13.7345 15.7501 13.4796 15.6459 13.29 15.46C13.1041 15.2704 12.9999 15.0155 12.9999 14.75C12.9999 14.4845 13.1041 14.2296 13.29 14.04C13.4834 13.8616 13.7369 13.7625 14 13.7625C14.2631 13.7625 14.5166 13.8616 14.71 14.04C14.75 14.09 14.79 14.14 14.83 14.2C14.8696 14.251 14.9001 14.3085 14.92 14.37C14.9489 14.4267 14.9691 14.4873 14.98 14.55C14.9911 14.6161 14.9978 14.683 15 14.75C14.9961 15.0147 14.8926 15.2683 14.71 15.46Z"
                fill="white"
              />
            </svg>
          }
        />
        <div
          style={{
            fontWeight: "400",
            fontSize: "12px",
            color: "red",
            width: "400px",
            height: "0px",
            marginTop: "-10px",
            display: signupSecurePassword ? "flex" : "none",
          }}
        >
          {"Password must be 12 characters long"}
        </div>
        <Input.Password
          bordered
          color={signupSamePassword ? "error" : "primary"}
          size="xl"
          width="415px"
          css={{ marginTop: "10px" }}
          placeholder="Confirm Password"
          onChange={(e: any) => {
            setSignupClicker(!signupClicker);
            setSignupData((prev: any) => {
              const newData = prev;
              newData.data.confirm_password = e.target.value;
              return newData;
            });
          }}
          contentLeft={
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.75 6.75V8.85C16.2524 8.78772 15.7515 8.75434 15.25 8.75V6.75C15.25 3.6 14.36 1.5 10 1.5C5.64 1.5 4.75 3.6 4.75 6.75V8.75C4.24849 8.75434 3.74765 8.78772 3.25 8.85V6.75C3.25 3.85 3.95 0 10 0C16.05 0 16.75 3.85 16.75 6.75Z"
                fill="white"
              />
              <path
                d="M16.75 8.85C16.2524 8.78772 15.7515 8.75434 15.25 8.75H4.75C4.24849 8.75434 3.74765 8.78772 3.25 8.85C0.7 9.16 0 10.41 0 13.75V15.75C0 19.75 1 20.75 5 20.75H15C19 20.75 20 19.75 20 15.75V13.75C20 10.41 19.3 9.16 16.75 8.85ZM6.71 15.46C6.51826 15.6426 6.26473 15.7461 6 15.75C5.86932 15.7484 5.74022 15.7212 5.62 15.67C5.49762 15.6217 5.38561 15.5504 5.29 15.46C5.10743 15.2683 5.00388 15.0147 5 14.75C5.00158 14.6193 5.02876 14.4902 5.08 14.37C5.13073 14.2489 5.20175 14.1373 5.29 14.04C5.38561 13.9496 5.49762 13.8783 5.62 13.83C5.80211 13.7534 6.00282 13.7325 6.19681 13.7699C6.3908 13.8072 6.56938 13.9012 6.71 14.04C6.79825 14.1373 6.86927 14.2489 6.92 14.37C6.97124 14.4902 6.99842 14.6193 7 14.75C6.99612 15.0147 6.89257 15.2683 6.71 15.46ZM10.92 15.13C10.8693 15.2511 10.7983 15.3627 10.71 15.46C10.5183 15.6426 10.2647 15.7461 10 15.75C9.73489 15.748 9.48068 15.6442 9.29 15.46C9.20175 15.3627 9.13073 15.2511 9.08 15.13C9.02876 15.0098 9.00158 14.8807 9 14.75C9.00197 14.4849 9.1058 14.2307 9.29 14.04C9.48339 13.8616 9.73687 13.7625 10 13.7625C10.2631 13.7625 10.5166 13.8616 10.71 14.04C10.8942 14.2307 10.998 14.4849 11 14.75C10.9984 14.8807 10.9712 15.0098 10.92 15.13ZM14.71 15.46C14.5204 15.6459 14.2655 15.7501 14 15.7501C13.7345 15.7501 13.4796 15.6459 13.29 15.46C13.1041 15.2704 12.9999 15.0155 12.9999 14.75C12.9999 14.4845 13.1041 14.2296 13.29 14.04C13.4834 13.8616 13.7369 13.7625 14 13.7625C14.2631 13.7625 14.5166 13.8616 14.71 14.04C14.75 14.09 14.79 14.14 14.83 14.2C14.8696 14.251 14.9001 14.3085 14.92 14.37C14.9489 14.4267 14.9691 14.4873 14.98 14.55C14.9911 14.6161 14.9978 14.683 15 14.75C14.9961 15.0147 14.8926 15.2683 14.71 15.46Z"
                fill="white"
              />
            </svg>
          }
        />
        <div
          style={{
            fontWeight: "400",
            fontSize: "12px",
            color: "red",
            width: "400px",
            display: signupSamePassword ? "flex" : "none",
          }}
        >
          {"Passwords don't match"}
        </div>
      </div>
      <Button
        color={"gradient"}
        css={{
          width: "250px",
          height: "50px",
          fontSize: "18px",
          marginTop: "50px",
        }}
        onPress={() => {
          signup();
        }}
      >
        Create Account
      </Button>
      <Text
        style={{
          fontFamily: "inter",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        OR
      </Text>
      <Button
        css={{
          background: "#fff",
          color: "#0A0808",
          fontWeight: "500",
          fontSize: "14px",
          width: "250px",
          height: "50px",
        }}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_476_4650)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.52 12.2727C23.52 11.4218 23.4436 10.6036 23.3018 9.81818H12V14.46H18.4582C18.18 15.96 17.3345 17.2309 16.0636 18.0818V21.0927H19.9418C22.2109 19.0036 23.52 15.9273 23.52 12.2727Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 24C15.24 24 17.9564 22.9254 19.9418 21.0927L16.0636 18.0818C14.9891 18.8018 13.6145 19.2272 12 19.2272C8.87455 19.2272 6.22909 17.1163 5.28546 14.28H1.27637V17.3891C3.25091 21.3109 7.30909 24 12 24Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.28545 14.28C5.04545 13.56 4.90909 12.7909 4.90909 12C4.90909 11.2091 5.04545 10.44 5.28545 9.71999V6.6109H1.27636C0.463636 8.2309 0 10.0636 0 12C0 13.9364 0.463636 15.7691 1.27636 17.3891L5.28545 14.28Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4.77273C13.7618 4.77273 15.3436 5.37818 16.5873 6.56727L20.0291 3.12545C17.9509 1.18909 15.2345 0 12 0C7.30909 0 3.25091 2.68909 1.27637 6.61091L5.28546 9.72C6.22909 6.88364 8.87455 4.77273 12 4.77273Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_476_4650">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
      >
        <span style={{ marginLeft: "12px" }}>Sign up with Google</span>
      </Button>
      <Text
        css={{
          display: "flex",
          color: "#949494",
          fontSize: "24px",
          fontFamily: "inter",
          fontWeight: "500",
          marginTop: "20px",
          gap: "6px",
        }}
      >
        Already have an account?
        <Text
          css={{
            fontFamily: "inter",
            fontSize: "24px",
            fontWeight: "600",
            cursor: "pointer",
            color: "$gradient",
            textGradient: "90deg, #E496E7 41.11%, #0478D4 100%",
          }}
        >
          <div
            onClick={() => {
              setIsSignup(false);
              setIsLogin(true);
            }}
          >
            Login
          </div>
        </Text>
      </Text>
    </Modal>
  );
};

export default SignupModal;
