import { Controller, Get, Param } from '@nestjs/common';

@Controller('houses')
export class HousesController {
  @Get('all')
  getAllHouses() {
    return 'All houses returned';
  }
  @Get(':id')
  getSingleHouse(@Param() id: { id: string }) {
    console.log(id);
    return `one returned ${id.id}`;
  }
}
