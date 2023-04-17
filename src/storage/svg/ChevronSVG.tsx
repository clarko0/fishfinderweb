import { useEffect, useState } from "react";
import { IStylingObject } from "../constants/interfaces";
import { STYLING } from "../constants/styling";
import { CheckTheme } from "../utils/local";

const ChevronSVG = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
  });
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00001 3.66666L0.333339 0.99999L1.03334 0.266656L3.00001 2.23332L4.96667 0.266656L5.66667 0.99999L3.00001 3.66666Z"
        fill={styling.background_main}
      />
    </svg>
  );
};
export default ChevronSVG;
