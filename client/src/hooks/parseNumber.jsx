const parseNumber = (string) => {
  return parseInt(string.replace(/,/g, ''), 10);
};
export default parseNumber;
