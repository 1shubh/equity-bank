export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase(); // Single word name
  }
  const initials =
    words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  return initials;
};

export const formatBalance = (balance) => {
  if (isNaN(balance)) return "";
  return Number(balance)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function getFirstName(fullName) {
  // Ensure fullName is a valid string
  if (!fullName || typeof fullName !== "string") {
    return ""; // Return an empty string if fullName is invalid
  }
  // Split the name by spaces and return the first part
  return fullName.trim().split(" ")[0];
}

export const generateTransactionNumber = (length = 12) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let newTransactionNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newTransactionNumber += characters[randomIndex];
  }
  return newTransactionNumber;
};

// console.log(generateTransactionNumber()); // Example: "a7c9f2k3b1p6"
