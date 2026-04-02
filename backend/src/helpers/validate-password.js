const validatePassword = (password) => {
  const bigRegex =
    /^(?!.*012)(?!.*123)(?!.*234)(?!.*345)(?!.*456)(?!.*567)(?!.*678)(?!.*789)(?!.*123456).{8,}$/;

  return bigRegex.test(password);
};

module.exports = validatePassword;
