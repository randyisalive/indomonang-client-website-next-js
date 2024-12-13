import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export const secretKey = "HelloWorld";

export const handleHashPassword = (password) => {
  const gensalt = 10;
  const salt = bcrypt.genSaltSync(gensalt);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const checkPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

export const encryptMessage = (message, key) => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  return encrypted;
};
export const decryptMessage = (encryptedMessage, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
