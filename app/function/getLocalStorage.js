export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  } else {
    console.log("ON SERVER");
  }
};
