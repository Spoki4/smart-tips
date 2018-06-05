import {
  Authorized,
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
  create(@Body() waiter: Waiter) {
    return this.repository.save(waiter);
  }

  @Authorized()
  @Put("/waiters/:id")
  update(@Param("id") id: number, @Body() waiter: Waiter) {
    const existedWaiter = this.repository.findOne(id);
    if (!existedWaiter)
      throw new NotFoundError(`Официант с id: ${id} не найден`);

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