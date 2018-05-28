import {Authorized, Body, Delete, Get, JsonController, Param, Post, Put} from "routing-controllers";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Cafe} from "../entities/cafe";
import {Repository} from "typeorm";

@JsonController()
export class CafesController {
  @InjectRepository(Cafe)
  private repository: Repository<Cafe>;

  @Authorized()
  @Get("/cafes")
  getAll() {
    return this.repository.find();
  }

  @Authorized()
  @Get("/cafes/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Authorized()
  @Post("/cafes")
  create(@Body() cafe: Cafe) {
    return this.repository.save(cafe);
  }

  @Authorized()
  @Put("/cafes/:id")
  update(@Param("id") id: number, @Body() cafe: Cafe) {
    return this.repository.update(id, cafe);
  }

  @Authorized()
  @Delete("/cafes/:id")
  remove(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}