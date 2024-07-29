const location = "India";

export const getCurrency = () => {
  let symbol;
  switch (location) {
    case "India":
      symbol = "₹";
      break;
    case "USA":
      symbol = "$";
      break;
    default:
      symbol = "₹";
      break;
  }

  return symbol;
};

export const getCapitalizedString = (s) => {
  const words = s.split(" ");

  let result = "";

  words.forEach((word, ind) => {
    result = result + word.charAt(0).toUpperCase() + word.slice(1);

    if (ind !== words.length - 1) {
      result = result + " ";
    }
  });

  return result;
};
