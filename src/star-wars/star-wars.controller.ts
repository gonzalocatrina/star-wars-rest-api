import { Controller, Get, Query } from '@nestjs/common';
import { StarWarsService } from './star-wars.service';

@Controller('star-wars')
export class StarWarsController {
  constructor(private readonly starWarsService: StarWarsService) {}

  @Get('films')
  async getFilms(@Query('title') title?: string) {
    return this.starWarsService.findFilms(title);
  }

  @Get('starships')
  async getStarships(@Query('name') name?: string) {
    return this.starWarsService.findStarships(name);
  }

  @Get('people')
  async getPeople(@Query('name') name?: string) {
    return this.starWarsService.findPeople(name);
  }

  @Get('planets')
  async getPlanets(@Query('name') name?: string) {
    return this.starWarsService.findPlanets(name);
  }
}
