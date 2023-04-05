interface StylingObject {
  [key: string]: any;
}

const AddSVG = (props: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5V10ZM10 10V15ZM10 10H5ZM10 10H15ZM3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19Z"
        fill={props.Styling.main}
      />
      <path
        d="M10 5V10M10 10V15M10 10H5M10 10H15M3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19Z"
        stroke="rgb(120, 126, 255)"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AddSVG;
