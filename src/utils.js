const getQuality = (tds) => {
  if (tds > 1200) {
    return "Unacceptable";
  } else if (tds > 500 && tds <= 1200) {
    return "very poor";
  } else if (tds > 300 && tds <= 500) {
    return "poor";
  } else if (tds > 250 && tds <= 300) {
    return "fair";
  } else if (tds > 150 && tds <= 250) {
    return "good";
  } else if (tds > 50 && tds <= 150) {
    return "excellent";
  } else {
    return "Invalid";
  }
};

const getPurifier = (tds) => {
  if (tds < 200) {
    return "UV Water Purifier";
  } else if (tds > 200 && tds <= 300) {
    return "RO+UV water purifier";
  } else if (tds > 300 && tds <= 500) {
    return "RO+UV+UF";
  } else {
    return "combination of RO+UV/UF with TDS Controller";
  }
};

export { getPurifier, getQuality };
