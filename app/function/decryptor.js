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
  console.log("Encrypted Message:", encrypted);
  return encrypted;
};

/* export const decryptMessage = (encryptedMessage, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Error decrypting message:", error.message);
    throw new Error("Malformed UTF-8 data");
  }
}; */

export const decryptMessage = (ciphertext, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    throw new Error("Error decrypting message: " + error.message);
  }
};

export const safeATOB = (str, rounds = 10) => {
  if (!validateBase64(str)) {
    console.error("Invalid base64 string:", str);
    return null;
  }
  return ATOB(str, rounds);
};

export const BTOA = (str = "", rounds = 10) => {
  let encodedStr = str;
  for (let i = 0; i < rounds; i++) {
    encodedStr = btoa(encodedStr);
  }
  return encodedStr;
};

export const ATOB = (str = "", rounds = 10) => {
  let decodedStr = str;
  for (let i = 0; i < rounds; i++) {
    decodedStr = atob(decodedStr);
  }
  return decodedStr;
};
