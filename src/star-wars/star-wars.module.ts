import { Module } from '@nestjs/common';
import { StarWarsService } from './star-wars.service';
import { StarWarsController } from './star-wars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { People, PeopleSchema } from './entities/people.entity';
import { Film, FilmSchema } from './entities/film.entity';
import { Starship, StarshipSchema } from './entities/starship.entity';
import { Planet, PlanetSchema } from './entities/planet.entity';

@Module({
  imports:[MongooseModule.forFeature([
    { name: People.name, schema: PeopleSchema },
    { name: Film.name, schema: FilmSchema },
    { name: Starship.name, schema: StarshipSchema },
    { name: Planet.name, schema: PlanetSchema }])],
  controllers: [StarWarsController],
  providers: [StarWarsService],
})
export class StarWarsModule {}
