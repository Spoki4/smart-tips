import {Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam} from "routing-controllers";
import {Repository} from "typeorm";
import {Waiter} from "../entities/waiter";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Transaction} from "../entities/transaction";

@JsonController()
export class WaitersController {

  @InjectRepository(Waiter)
  private repository: Repository<Waiter>;

  @Authorized()
  @Get("/waiters")
  getMany(@QueryParam("cafeId") cafeId: number) {
    if (cafeId)
      return this.repository.find({where: {cafe: cafeId}});

    return this.repository.find();
  }

  @Authorized()
  @Get("/waiters/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Authorized()
  @Post("/waiters")
  create(@Body() transaction: Transaction) {
    return this.repository.save(transaction);
  }

  @Authorized()
  @Put("/waiters/:id")
  update(@Param("id") id: number, @Body() transaction: Transaction) {
    return this.repository.update(id, transaction);
  }

  @Authorized()
  @Delete("/waiters/:id")
  remove(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}