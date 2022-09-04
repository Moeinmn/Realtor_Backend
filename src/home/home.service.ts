import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { HomeResponseDto, SearchHomeDto } from "./dtos/home.dto";

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllHomes(
    queryObj : SearchHomeDto
  ): Promise<HomeResponseDto[]> {
    let homes = await this.prismaService.home.findMany();
    return homes.map((home) => new HomeResponseDto(home));
  }

  async getOneHome() {}

  async createHome() {}

  async inqureHome() {}

  async updateHome() {}

  async deleteHome() {}
}
