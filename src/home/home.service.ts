import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { HomeResponseDto, SearchHomeInterface } from "./dtos/home.dto";

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllHomes(
    filterObj : SearchHomeInterface
  ): Promise<HomeResponseDto[]> {
    console.log(filterObj);
    
    let homes = await this.prismaService.home.findMany({
      where: filterObj
    });
    return homes.map((home) => new HomeResponseDto(home));
  }

  async getOneHome(id: number) {
    let home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });
    
    if (!home) new NotFoundException();

    return new HomeResponseDto(home);
  }

  async createHome() {}

  async inqureHome() {}

  async updateHome() {}

  async deleteHome(id: number) {
    let home = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    if (!home) new NotFoundException();
    return `home with id = ${home.id} deleted successfully`;
  }
}
