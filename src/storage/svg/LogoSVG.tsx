import Logo from "../../public/baselogo.png";

const LogoSVG = () => {
  return (
    <img
      src={Logo.src}
      width="150px"
      style={{
        marginTop: "-20px",
      }}
    />
  );
};
export default LogoSVG;
