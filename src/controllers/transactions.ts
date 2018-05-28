import {Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam} from "routing-controllers";
import {Repository} from "typeorm";
import {Transaction} from "../entities/transaction";
import {InjectRepository} from "typeorm-typedi-extensions";

@JsonController("")
export class TransactionsController {

  @InjectRepository(Transaction)
  private repository: Repository<Transaction>

  @Authorized()
  @Get("/transactions")
  getMany(
    @QueryParam("cafeId") cafeId: number,
    @QueryParam("waiterId") waiterId: number,
    @QueryParam("guestId") guestId: number
  ) {
    if (cafeId)
      return this.repository.find({where: {cafe: cafeId}});
    else if (waiterId)
      return this.repository.find({where: {waiter: waiterId}});
    else if (guestId)
      return this.repository.find({where: {guest: guestId}});
    return this.repository.find();
  }

  @Authorized()
  @Get("/transactions/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Post("/transactions")
  create(@Body() transaction: Transaction) {
    console.log(transaction);
    return this.repository.save(transaction);
  }

  @Authorized()
  @Put("/transactions/:id")
  update(@Param("id") id: number, @Body() transaction: Transaction) {
    return this.repository.update(id, transaction);
  }

  @Authorized()
  @Delete("/transactions/:id")
  remove(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}