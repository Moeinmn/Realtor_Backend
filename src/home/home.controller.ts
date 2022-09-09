import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Roles } from "./decorators/roles.deocrator";
import { CreateHomeRequestDto, UpdateHomeRequestDto } from "./dtos/home.dto";
import { HomeService } from "./home.service";
import { UserType } from '@prisma/client';

@Controller("/home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getAllHomes(
    // @Query() searchObj : SearchHomeDto
    @Query("landSize") land_size?: number,
    @Query("maxPrice") max_price?: number,
    @Query("minPrice") min_price?: number
  ) {
    let objForPassing = {
      ...(land_size && { land_size }),
      ...(min_price || max_price
        ? {
            price: {
              ...(min_price && { gte: min_price }),
              ...(max_price && { lte: max_price }),
            },
          }
        : undefined),
    };

    return this.homeService.getAllHomes(objForPassing);
  }

  @Get(":id")
  async getOneHome(@Param("id", ParseIntPipe) id: number) {
    return this.homeService.getOneHome(id);
  }

  @Roles(UserType.REALTOR , UserType.ADMIN)
  @Post()
  async createHome(@Body() createDataObj: CreateHomeRequestDto) {
    return this.homeService.createHome(createDataObj);
  }

  @Post(":id")
  async inqureHome() {
    return this.homeService.inqureHome();
  }

  @Roles(UserType.REALTOR , UserType.ADMIN)
  @Put(":id")
  async updateHome(
    @Param("id") id: number,
    @Body() updateHomeObj: UpdateHomeRequestDto
  ) {
    return this.homeService.updateHome(id, updateHomeObj);
  }

  @Roles(UserType.REALTOR , UserType.ADMIN)
  @Delete(":id")
  async deleteHome(@Param("id", ParseIntPipe) id: number) {
    return this.homeService.deleteHome(id);
  }
}
