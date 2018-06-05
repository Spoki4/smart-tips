import {Authorized, Body, Delete, Get, JsonController, NotFoundError, Param, Post, Put} from "routing-controllers";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Guest} from "../entities/guest";
import {Repository} from "typeorm";

@JsonController()
export class GuestsController {
  @InjectRepository(Guest)
  private repository: Repository<Guest>;

  @Authorized()
  @Get("/guests")
  getAll() {
    return this.repository.find();
  }

  @Authorized()
  @Get("/guests/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Post("/guests")
  create(@Body() guest: Guest) {
    if(!guest.email && !guest.phoneNumber)
      throw Error("Необходимо заполнить либо номер телефона либо email");
    return this.repository.save(guest);
  }

  @Authorized()
  @Put("/guests/:id")
  async update(@Param("id") id: number, @Body() guest: Guest) {
    const existedGuest = await this.repository.findOne(id);
    if (!existedGuest)
      throw new NotFoundError(`Гость с id: ${id} не найден`);

    return this.repository.save({...existedGuest, ...guest, id: id});
  }

  @Authorized()
  @Delete("/guests/:id")
  async remove(@Param("id") id: number) {
    const guest = await this.repository.findOne(id);

    if(!guest)
      throw new NotFoundError(`Гость с id: ${id} не найден`);

    return this.repository.remove(guest);
  }
}