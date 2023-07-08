const jwt = require('jsonwebtoken');

export const generateToken = (data) => {
  return jwt.sign(data, process.env.NEXT_PUBLIC_SECRET_TOKEN);
};

export const verifyToken = (data) => {
  return jwt.verify(data, process.env.NEXT_PUBLIC_SECRET_TOKEN);
};
