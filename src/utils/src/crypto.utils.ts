import crypto from "crypto";

function createCipher(secret: string) {
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

  return {
    encrypt(data: string) {
      return cipher.update(data, "utf-8", "hex") + cipher.final("hex");
    },
    decrypt(data: string) {
      return decipher.update(data, "hex", "utf-8") + decipher.final("utf-8");
    },
  };
}

const secret = process.env.WEB3_SECRET || "";
const { encrypt, decrypt } = createCipher(secret);

export const Crypto = {
  encrypt,
  decrypt,
};
