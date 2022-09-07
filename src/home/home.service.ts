import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import {
  CreateHomeRequestDto,
  HomeResponseDto,
  SearchHomeDto,
  UpdateHomeRequestDto,
} from "./dtos/home.dto";

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllHomes(queryObj: SearchHomeDto): Promise<HomeResponseDto[]> {
    let homes = await this.prismaService.home.findMany({
      where: queryObj,
    });
    if (!homes.length) throw new NotFoundException();

    return homes.map((home) => new HomeResponseDto(home));
  }

  async getOneHome(id: number) {
    let home = await this.prismaService.home.findUnique({
      where: {
        id: id,
      },
    });

    if (!home) new NotFoundException();

    return new HomeResponseDto(home);
  }

  async createHome(createDataObj: CreateHomeRequestDto) {
    let createdHome = await this.prismaService.home.create({
      data: {
        ...createDataObj,
        realtor_id: 10,
      },
    });

    return new HomeResponseDto(createdHome);
  }

  async inqureHome() {}

  async updateHome( id :number , updateHomeObj:UpdateHomeRequestDto ) {
    let updatedHome = await this.prismaService.home.update({
      where:{
        id
      },
      data:updateHomeObj
    })
    return updateHomeObj
  }

  async deleteHome(id: number) {

    //all relations must be deleted from DB
    try {
      let home = await this.prismaService.home.delete({
        where: {
          id,
        },
      });
      console.log(home);
      
      return `home with id = ${home.id} deleted successfully`;
    } catch (error) {
      console.log(error);
      
      throw new Error(error);
    }
  }
}
