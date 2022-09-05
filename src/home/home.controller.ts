import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { SearchHomeDto } from "./dtos/home.dto";
import { HomeService } from "./home.service";

@Controller("/home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getAllHomes(
    @Query() searchObj : SearchHomeDto
  ) {
    return this.homeService.getAllHomes(searchObj);
  }

  @Get(":id")
  async getOneHome(
    @Param() id : number
  ) {
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
  async deleteHome(
    @Param('id' , ParseIntPipe) id : number 
  ) {
    return this.homeService.deleteHome(id);
  }
}
