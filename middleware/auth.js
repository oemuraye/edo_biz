import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //To check if it is a token from server not Google

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "edobiz");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
