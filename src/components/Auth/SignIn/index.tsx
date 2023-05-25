import TextInput from "@/components/Inputs/Text";
import PositionBar from "../Position";
import { genRanHex } from "@/storage/constants/misc";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn";

const SignIn = ({ ...props }: any) => {
  return (
    <div
      style={{
        background: "#3B0C51",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        zIndex: "1",
        borderRadius: "30px",
        width: "540px",
        position: "absolute",
        right: "70px",
        transition: "0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "rgba(187, 107, 217, 1)",
              lineHeight: "19px",
            }}
          >
            First things first
          </div>
          <div
            style={{ fontWeight: "600", fontSize: "22px", lineHeight: "26px" }}
          >
            Sign In
          </div>
        </div>
        <PositionBar nodes={3} node={0} complete={false} error={false} />
      </div>
      <div
        style={{
          marginTop: "22px",
          gap: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextInput
          id={genRanHex(16)}
          id2={genRanHex(16)}
          id3={genRanHex(16)}
          type="email"
          placeholder="E-mail"
        />
        <TextInput
          id={genRanHex(16)}
          id2={genRanHex(16)}
          id3={genRanHex(16)}
          type="password"
          placeholder="Password"
        />
      </div>
      <PrimaryBtn
        text={"Login"}
        onClick={() => {}}
        css={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default SignIn;
