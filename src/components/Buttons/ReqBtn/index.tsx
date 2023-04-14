const ReqBtn = (props: any) => {
  return (
    <div
      style={{
        marginTop: "25px",
        fontSize: "30px",
        fontWeight: "600",
        width: props.width,
        height: props.height,
        display: "flex",
        alignItems: "center",
        transition: "0.2s",
        justifyContent: "center",
        background: props.condition ? "rgba(51, 102, 204, 1)" : "grey",
        borderRadius: "6px",
        cursor: props.condition ? "pointer" : "not-allowed",
      }}
      onClick={async () => {
        props.func();
      }}
    >
      {props.text}
    </div>
  );
};

export default ReqBtn;
