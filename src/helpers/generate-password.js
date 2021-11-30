import cryptoRandomString from "crypto-random-string";

const LENGTH = 8;

const generatePassword = (base = "") => {
  const letters = base.match(/\b(\w)/gi) || [];
  const memorable = letters.join("").substring(0, 2);

  const random = cryptoRandomString({
    type: "alphanumeric",
    length: LENGTH - memorable.length,
  });

  return memorable + random;
};

export default generatePassword;
