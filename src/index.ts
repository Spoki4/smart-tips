import "reflect-metadata"
import {createExpressServer, useContainer} from "routing-controllers";
import {CafesController} from "./controllers/cafes";
import {Container} from "typedi";
import {Database} from "./database";
import {GuestsController} from "./controllers/guests";
import {TransactionsController} from "./controllers/transactions";
import {WaitersController} from "./controllers/waiters";
import {ReviewsController} from "./controllers/reviews";
import {checkValidToken} from "./services/authorization";
import {AuthorizationController} from "./controllers/authorization";

// Init database connection
new Database(process.env.DATABASE_URL);

useContainer(Container);
/**
 * if you can use a SSL, check this method {@link routing-controllers/useExpressServer }
 */
createExpressServer({
  cors: true,
  controllers: [
    AuthorizationController,
    CafesController,
    GuestsController,
    ReviewsController,
    TransactionsController,
    WaitersController,
  ],
  authorizationChecker: checkValidToken
}).listen(process.env.PORT);