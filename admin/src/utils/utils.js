
const location = 'India';

export const getCurrency = () => {

    let symbol;
    switch (location) {
        case 'India':
            symbol = '₹'
            break;
        case 'USA':
            symbol = '$'
            break;
        default:
            symbol = '₹'
            break;
    }

    return symbol;
}

export const formatAmount = (amount) => {
    if (amount > 10000000) {
      amount = (amount / 10000000).toFixed(3);
      return `${amount}Cr`;
    } else if (amount > 100000) {
      amount = (amount / 100000).toFixed(3);
      return `${amount}L`;
    } else if (amount > 1000) {
      amount = (amount / 1000).toFixed(3);
      return `${amount}K`;
    } else {
      return amount;
    }
  };