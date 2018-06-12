import {
  Authorized,
  BadRequestError,
  Body,
  Delete,
  Get,
  JsonController, NotFoundError,
  Param,
  Post,
  Put,
  QueryParam
} from "routing-controllers";
import {Repository} from "typeorm";
import {Transaction} from "../entities/transaction";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Guest} from "../entities/guest";
import {isNumber} from "util";
import {Waiter} from "../entities/waiter";

@JsonController("")
export class TransactionsController {

  @InjectRepository(Transaction)
  private repository: Repository<Transaction>

  @InjectRepository(Guest)
  private guestRepository: Repository<Guest>

  @InjectRepository(Waiter)
  private waiterRepository: Repository<Waiter>

  @Authorized()
  @Get("/transactions")
  getMany(
    @QueryParam("cafeId") cafeId: number,
    @QueryParam("waiterId") waiterId: number,
    @QueryParam("guestId") guestId: number
  ) {
    if (cafeId) {
      return this.repository
        .createQueryBuilder("transaction")
        .leftJoin("transaction.waiter", "waiter")
        .leftJoinAndSelect("transaction.review", "review")
        .where("waiter.cafe = :cafeId")
        .setParameters({ cafeId })
        .getMany()
    }
    else if (waiterId)
      return this.repository.find({where: {waiter: waiterId}, relations: ["review"]});
    else if (guestId)
      return this.repository.find({where: {guest: guestId}, relations: ["review"]});
    return this.repository.find({relations: ["review"]});
  }

  @Authorized()
  @Get("/transactions/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne({where: {id}, relations: ["review"]})
  }

  @Post("/transactions")
  async create(@Body() transaction: Transaction) {
    if (transaction.guest) {
      if (typeof transaction.guest !== "number") {
        throw new BadRequestError("Guest must be a id number")
      }
      const guest = await this.guestRepository.findOne(transaction.guest);

      if(!guest) {
        throw new NotFoundError(`Guest with id ${transaction.guest} not found`);
      }
    }

    if (typeof transaction.waiter !== "number") {
      throw new BadRequestError("Waiter must be a id number")
    }
    const waiter = await this.waiterRepository.findOne(transaction.waiter);

    if(!waiter) {
      throw new NotFoundError(`Waiter with id ${transaction.waiter} not found`);
    }

    return this.repository.save(transaction);
  }

  @Authorized()
  @Put("/transactions/:id")
  async update(@Param("id") id: number, @Body() transaction: Transaction) {
    const existedTransaction = await this.repository.findOne({
      where: {id},
      relations: ["review"]
    });

    if(!existedTransaction) {
      throw new NotFoundError(`Transaction with id ${id} not found`)
    }

    if (transaction.guest) {
      if (typeof transaction.guest !== "number") {
        throw new BadRequestError("Guest must be a id number")
      }
      const guest = await this.guestRepository.findOne(transaction.guest);

      if(!guest) {
        throw new NotFoundError(`Guest with id ${transaction.guest} not found`);
      }
    }

    if (typeof transaction.waiter !== "number") {
      throw new BadRequestError("Waiter must be a id number")
    }
    const waiter = await this.waiterRepository.findOne(transaction.waiter);

    if(!waiter) {
      throw new NotFoundError(`Waiter with id ${transaction.waiter} not found`);
    }

    return this.repository.save({
      ...existedTransaction,
      ...transaction,
      id: existedTransaction.id,
      review: {
        ...existedTransaction.review,
        ...transaction.review,
        id: existedTransaction.review.id
      }
    });
  }

  @Authorized()
  @Delete("/transactions/:id")
  async remove(@Param("id") id: number) {
    const transaction = await this.repository.findOne(id)

    if(!transaction) {
      throw new NotFoundError(`Transaction with id ${id} not found`)
    }
    return this.repository.remove(transaction);
  }
}