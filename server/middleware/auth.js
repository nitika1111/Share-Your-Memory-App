import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500; // Not Google Auth

    let decodedData;
    if (token && isCustomAuth) {
      // Custom Auth
      decodedData = jwt.verify(token, 'secret');

      req.userId = decodedData?.id;
    } else {
      // Google Auth
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
