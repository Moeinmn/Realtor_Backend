import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { HomeResponseDto } from "./dtos/home.dto";
import { HomeService } from "./home.service";

@Controller("/home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getAllHomes(
    @Query("landSize") landSize: number,
    @Query("maxPrice") maxPrice: number,
    @Query("minPrice") minPrice: number
  ): Promise<HomeResponseDto[]> {
    
    const filterObj  = {
      ...(landSize && { landSize }),
      price:(maxPrice || minPrice
        ? {
            ...(minPrice && { min_price : maxPrice }),
            ...(maxPrice && { max_price : maxPrice }),
          }
        : undefined),
    };

    return this.homeService.getAllHomes(filterObj);
  }

  @Get(":id")
  async getOneHome(@Param() id: number): Promise<HomeResponseDto> {
    return this.homeService.getOneHome(id);
  }

  @Post()
  async createHome() {
    return this.homeService.createHome();
  }

  @Post(":id")
  async inqureHome() {
    return this.homeService.inqureHome();
  }

  @Put(":id")
  async updateHome() {
    return this.homeService.updateHome();
  }

  @Delete(":id")
  async deleteHome(@Param("id", ParseIntPipe) id: number) {
    return this.homeService.deleteHome(id);
  }
}
