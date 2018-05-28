import {Action} from "routing-controllers";
import * as jwt from "jsonwebtoken"


export const createToken = (login) => {
  const token = jwt.sign(
    {login: login},
    process.env.JWT_SECRET,
    {expiresIn: process.env.TOKEN_EXPIRES}
  )

  return token
}

export const checkValidToken = (action: Action, roles: string[]) => {
  const token = action.request.headers["authorization"];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};
