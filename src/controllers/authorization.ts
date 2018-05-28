import {Body, JsonController, NotFoundError, Post} from "routing-controllers";
import {createToken} from "../services/authorization";


@JsonController()
export class AuthorizationController {

  @Post("/login")
  login(@Body() authData: {login: string, password: string}) {
    if (authData.login !== "admin" || authData.password !== "admin") {
       throw new NotFoundError("Пользователь не найден")
    }

    const token = createToken(authData.login);

    return {token}
  }
}