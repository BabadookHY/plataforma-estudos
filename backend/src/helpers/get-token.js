const getToken = (req) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  return token;
};

module.exports = getToken;