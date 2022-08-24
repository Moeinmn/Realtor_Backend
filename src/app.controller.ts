import { Controller, Get, Param } from '@nestjs/common';

@Controller('test')
export class AppController {
  @Get(':id')
  getAllExpense(@Param('id') x: string): string {
    return x;
  }
}
