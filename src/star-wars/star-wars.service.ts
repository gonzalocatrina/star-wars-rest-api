import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from './entities/film.entity';
import { Model } from 'mongoose';
import { Starship } from './entities/starship.entity';
import { People } from './entities/people.entity';
import { Planet } from './entities/planet.entity';

@Injectable()
export class StarWarsService {

  constructor(@InjectModel(Film.name) private filmModel: Model<Film>,
  @InjectModel(Starship.name) private starshipModel: Model<Starship>,
  @InjectModel(People.name) private peopleModel: Model<People>,
  @InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async findFilms(title?: string): Promise<Film[]> {
    let filter = {};
    if (title) {
      filter = { title: new RegExp(title, 'i') };
    }
    return this.filmModel.find(filter).exec();
  }

  async findStarships(name?: string): Promise<Starship[]> {
    let filter = {};
    if (name) {
      filter = { name: new RegExp(name, 'i') };
    }
    return this.starshipModel.find(filter).exec();
  }

  async findPeople(name?: string, gender?: string, eyeColor?: string): Promise<People[]> {
    let filter = {};

    if (name) {
      filter['name'] = new RegExp(name, 'i');
    }
    if (gender) {
      filter['gender'] = gender;
    }
    if (eyeColor) {
      filter['eye_color'] = eyeColor;
    }
    return this.peopleModel.find(filter).exec();
  }


  async findPlanets(name?: string, population?: string): Promise<Planet[]> {
    let filter = {};
    if (name) {
      filter['name'] = new RegExp(name, 'i');
    }
    if (population) {
      filter['population'] = population;
    }
    return this.planetModel.find(filter).exec();
  }

}
