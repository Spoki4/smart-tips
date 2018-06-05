import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put
} from "routing-controllers";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Cafe} from "../entities/cafe";
import {Repository} from "typeorm";
import {Waiter} from "../entities/waiter";
import {Review} from "../entities/review";
import {Transaction} from "../entities/transaction";

@JsonController()
export class CafesController {
  @InjectRepository(Cafe)
  private repository: Repository<Cafe>;

  @InjectRepository(Waiter)
  private waiterRepository: Repository<Waiter>;

  @Authorized()
  @Get("/cafes")
  getAll() {
    return this.repository
      .createQueryBuilder("cafe")
      .leftJoin("cafe.waiters", "waiter")
      .leftJoin(Transaction, "transaction", "transaction.waiter = waiter.id")
      .leftJoin(Review, "review", "review.id = transaction.review")
      .select(["cafe.id as id", "cafe.name as name", "cafe.address as address", "cafe.description as description"])
      .addSelect("AVG(review.rating)", "rating")
      .groupBy("cafe.id")
      .getRawMany()
  }

  @Authorized()
  @Get("/cafes/:id")
  getOne(@Param("id") id: number) {
    const data = this.repository
      .createQueryBuilder("cafe")
      .leftJoin("cafe.waiters", "waiter")
      .leftJoin(Transaction, "transaction", "transaction.waiter = waiter.id")
      .leftJoin(Review, "review", "review.id = transaction.review")
      .select(["cafe.id as id", "cafe.name as name", "cafe.address as address", "cafe.description as description"])
      .addSelect("AVG(review.rating)", "rating")
      .andWhere("cafe.id = :id")
      .groupBy("cafe.id")
      .setParameters({id})
      .getRawOne();

    if(!data)
      throw new NotFoundError(`Ресторан с id: ${id} не найден`);
    return data;
  }

  @Authorized()
  @Post("/cafes")
  create(@Body() cafe: Cafe) {
    return this.repository.save(cafe);
  }

  @Authorized()
  @Put("/cafes/:id")
  async update(@Param("id") id: number, @Body() cafe: Cafe) {
    const existedCafe = await  this.repository.findOne(id);
    if (!existedCafe)
      throw new NotFoundError(`Ресторан с id: ${id} не найден`);

    return this.repository.save({...existedCafe, ...cafe, id: id});
  }

  @Authorized()
  @Delete("/cafes/:id")
  async remove(@Param("id") id: number) {
    const cafe = await this.repository.findOne(id);

    if(!cafe)
      throw new NotFoundError(`Ресторан с id: ${id} не найден`);

    return this.repository.remove(cafe);
  }
}