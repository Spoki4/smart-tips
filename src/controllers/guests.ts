import {Authorized, Body, Delete, Get, JsonController, Param, Post, Put} from "routing-controllers";
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
  update(@Param("id") id: number, @Body() guest: Guest) {
    return this.repository.update(id, guest);
  }

  @Authorized()
  @Delete("/guests/:id")
  remove(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}