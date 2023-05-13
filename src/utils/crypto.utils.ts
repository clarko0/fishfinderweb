import crypto from "crypto";

const secret =
  process.env.DEV_WEB3_SECRET === undefined ? "" : process.env.DEV_WEB3_SECRET;
const key = crypto
  .createHash("sha512")
  .update(secret)
  .digest("hex")
  .substring(0, 32);
const iv = crypto
  .createHash("sha512")
  .update(secret)
  .digest("hex")
  .substring(0, 16);
const cipher = crypto.createCipheriv("aes256", key, iv);
const decipher = crypto.createDecipheriv("aes256", key, iv);

export const CryptoUtils = {
  encrypt(data: string): string {
    return cipher.update(data, "utf-8", "hex") + cipher.final("hex");
  },
  decrypt(data: string): string {
    return decipher.update(data, "hex", "utf-8") + decipher.final("utf-8");
  },
};
