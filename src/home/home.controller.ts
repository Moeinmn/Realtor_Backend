import { Controller, Delete, Get, Post, Put, Query , Body } from '@nestjs/common';
import { HomeService } from './home.service';
import { SearchHomeDto, CreateHomeDto } from './dtos/home.dto';

@Controller('/home')
export class HomeController {
    constructor ( private readonly homeService : HomeService){}

    @Get()
    async getAllHomes(
        @Query() queryObj : SearchHomeDto
    ){
        console.log(queryObj);
        
        return this.homeService.getAllHomes(queryObj)
    }

    @Get(':id')
    async getOneHome(){
        return this.homeService.getOneHome()
    }
    
    @Post()
    async createHome(
        @Body() createHomeObj : CreateHomeDto
    ){
        return this.homeService.createHome()
    }
    
    @Post(':id')
    async inqureHome(){
        return this.homeService.inqureHome()
    }
    
    @Put(':id')
    async updateHome(){
        return this.homeService.updateHome()
    }

    @Delete()
    async deleteHome(){
        return this.homeService.deleteHome()
    }


}
