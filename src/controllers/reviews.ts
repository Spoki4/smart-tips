import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
  Authorized,
  NotFoundError
} from "routing-controllers";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {Review} from "../entities/review";
import {Guest} from "../entities/guest";

@JsonController()
export class ReviewsController {

  @InjectRepository(Review)
  private repository: Repository<Review>;

  @Authorized()
  @Get("/reviews")
  getMany(
    @QueryParam("cafeId") cafeId: number,
    @QueryParam("waiterId") waiterId: number
  ) {
    if (cafeId)
      return this.repository.find({where: {cafe: cafeId}});
    else if (waiterId)
      return this.repository.find({where: {waiter: waiterId}});

    return this.repository.find()
  }

  @Authorized()
  @Get("/reviews/:id")
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Authorized()
  @Post("/reviews")
  create(@Body() review: Review) {
    return this.repository.save(review);
  }

  @Authorized()
  @Put("/reviews/:id")
  async update(@Param("id") id: number, @Body() review: Review) {
    const existedReview = await this.repository.findOne(id);
    if (!existedReview)
      throw new NotFoundError(`Отзыв с id: ${id} не найден`);

    return this.repository.save({...existedReview, ...review, id: id});
  }

  @Authorized()
  @Delete("/reviews/:id")
  async remove(@Param("id") id: number) {
    const existedReview = await this.repository.findOne(id);
    if (!existedReview)
      throw new NotFoundError(`Отзыв с id: ${id} не найден`);
    return this.repository.remove(existedReview);
  }
}