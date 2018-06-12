import {
  Authorized, BadRequestError,
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  QueryParam
} from "routing-controllers";
import {Repository} from "typeorm";
import {Waiter} from "../entities/waiter";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Cafe} from "../entities/cafe";

@JsonController()
export class WaitersController {

  @InjectRepository(Waiter)
  private repository: Repository<Waiter>;

  @InjectRepository(Cafe)
  private cafeRepository: Repository<Cafe>;

  @Authorized()
  @Get("/waiters")
  getMany(@QueryParam("cafeId") cafeId: number) {
    if (cafeId)
      return this.repository.find({where: {cafe: cafeId}});

    return this.repository.find();
  }

  @Authorized()
  @Get("/waiters/:id")
  async getOne(@Param("id") id: number) {
    const waiter = await this.repository.findOne(id);

    if(!waiter)
      throw new NotFoundError(`Официант с id: ${id} не найден`);

    return waiter
  }

  @Authorized()
  @Post("/waiters")
  async create(@Body() waiter: Waiter) {
    if (typeof waiter.cafe !== "number") {
        throw new BadRequestError("Cafe must be a id number")
    }

    const existedCafe = await this.cafeRepository.findOne(waiter.cafe);

    if(!existedCafe) {
      throw new NotFoundError(`Cafe with id ${waiter.id} not found`)
    }

    return this.repository.save(waiter);
  }

  @Authorized()
  @Put("/waiters/:id")
  async update(@Param("id") id: number, @Body() waiter: Waiter) {
    const existedWaiter = this.repository.findOne(id);
    if (!existedWaiter)
      throw new NotFoundError(`Официант с id: ${id} не найден`);

    const existedCafe = await this.cafeRepository.findOne(waiter.cafe);

    if(!existedCafe) {
      throw new NotFoundError(`Cafe with id ${waiter.id} not found`)
    }

    return this.repository.save({...existedWaiter, ...waiter, id: id});
  }

  @Authorized()
  @Delete("/waiters/:id")
  async remove(@Param("id") id: number) {
    const waiter = await this.repository.findOne(id);

    if(!waiter)
      throw new NotFoundError(`Официант с id: ${id} не найден`);

    return this.repository.remove(waiter);
  }
}