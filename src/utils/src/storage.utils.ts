import { Dispatch, SetStateAction } from "react";

type Setter<T> = Dispatch<SetStateAction<T>>;

const updateData = <T>(
  setter: Setter<T>,
  key: string,
  value: T[keyof T]
): void => {
  try {
    setter((prevData) => {
      let newData = { ...prevData };

      const keys: string[] = key.split(".");

      const updateValue = (obj: any, keysArr: string[], val: any): void => {
        const currentKey = keysArr[0];

        if (keysArr.length === 1) {
          obj[currentKey] = val;
        } else {
          if (!obj[currentKey] || typeof obj[currentKey] !== "object") {
            obj[currentKey] = {};
          }

          updateValue(obj[currentKey], keysArr.slice(1), val);
        }
      };
      updateValue(newData, keys, value);
      return newData;
    });
  } catch (error) {
    console.log(error);
  }
};

export const Storage = {
  updateData,
};
