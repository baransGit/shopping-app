export const isValidLuhnNumber = (cardNumber: string): boolean => {
  if (!cardNumber) return false;
  const cleaned = cardNumber.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(cleaned)) return false;
  let sum = 0;
  let alternate = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
};
