import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('/home')
export class HomeController {
    constructor ( private readonly homeService : HomeService){}

    @Get()
    async getAllHomes(){
        return this.homeService.getAllHomes()
    }

    @Get(':id')
    async getOneHome(){
        return this.homeService.getOneHome()
    }
    
    @Post()
    async createHome(){
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
