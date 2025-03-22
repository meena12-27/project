// export const getUserFromStorage=()=>{
//   const token=JSON.parse(localStorage.getItem('userInfo')||null);
//   return token?.token;
// }
// export const getUserFromStorage = () => {
//   const token = JSON.parse(localStorage.getItem("userInfo") || null);
//   return token?.token;
// };
export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null;  // ✅ Handle missing data
  try {
      const parsedData = JSON.parse(userInfo);
      return parsedData?.token || null;
  } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
  }
};
