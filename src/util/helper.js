import { v4 as uuid } from "uuid";

export const setUserGlobalInfo = ({ uid, email, image, name }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("uid", uid);
    localStorage.setItem("userName", name);

    localStorage.setItem("userImage", image);
    localStorage.setItem("userEmail", email);
  }
};
export const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
export const generateUniqueId = () => {
  const unique_id = uuid();
  return unique_id;
};
export const getStorageUrl = (folderName, fileName) => {
  return `https://firebasestorage.googleapis.com/v0/b/meta-doc.appspot.com/o/${folderName}%2F${fileName}?alt=media&token=6aaf9fdc-f85a-4f50-9681-daf1b1b84079`;
};
export const fileTypeName = (name) => {
  //console.log("file type", name);
  if (name.includes("sheet") || name.includes("excel")) return "xls";
  else if (name.includes("document")) return "doc";
  else if (name.includes("javascript")) return "js";
  else if (name.includes("x-msdownload")) return "exe";
  else if (name.includes("x-zip-compressed")) return "zip";
  else if (name.includes("plain")) return "txt";
  else if (name.includes("x-gzip")) return "tar";
  else if (name.includes("svg+xml")) return "svg";
  return name;
};
export const isNumber = (text, getMessage) => {
  text += "";
  let test = /^\d+$/.test(text);
  if (getMessage) return test ? null : "Only number is allowed";
  return test;
};
export const deleteArrayElement = (array, index) => {
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
export const findObj = (value, arrJson, key) => {
  if (!value || !key || !arrJson) return -1;
  for (let i = 0; i < arrJson.length; i++) {
    const element = arrJson[i][key];
    if (element === value) return i;
  }
  return -1;
};

export const screenSizes = {
  lg: "(min-width: 992px)",
  xs: "(max-width: 768px)",
  md: "(min-width: 768px)",
  sm: "(max-width: 576px)",
  xl: "(min-width: 1200px)",
};
export const sanitizeString = (string) => {
  //console.log(string);
  // ".", "#", "$", "[", or "]"
  return string
    .replace(".", "-")
    .replace("#", "-")
    .replace("$", "-")
    .replace("[", "-")
    .replace("]", "-");
};
export function pickTextColorBasedOnBgColorAdvanced(
  bgColor,
  lightColor = "#FFFFFF",
  darkColor = "#000000"
) {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}