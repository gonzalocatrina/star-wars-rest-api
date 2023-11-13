import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Film } from '../entities/film.entity';
import { Starship } from '../entities/starship.entity';
import { People } from '../entities/people.entity';
import {  Model } from 'mongoose';
import { Planet } from '../entities/planet.entity';

@Injectable()
export class SyncronizeDatabaseService {
  private readonly logger = new Logger(SyncronizeDatabaseService.name);

  constructor(
  @InjectModel(Film.name) private filmModel: Model<Film>,
  @InjectModel(Starship.name) private starshipModel: Model<Starship>,
  @InjectModel(People.name) private peopleModel: Model<People>,
  @InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  //Cron runs 10 seconds after the app started
  @Cron(new Date(Date.now() + 10 * 1000))
  async handleCron() {
    const initialUrl = process.env.SWAPI_URL;

    // Concurrently updating the database for each entity
    await Promise.all([this.updateDatabase(initialUrl,'films/',this.filmModel, 'title'),
    this.updateDatabase(initialUrl,'starships/',this.starshipModel),
    this.updateDatabase(initialUrl,'people/',this.peopleModel),
    this.updateDatabase(initialUrl,'planets/',this.planetModel)])
    this.logger.debug('Database is up to date');
  }

  async updateDatabase(baseUrl: string,paramUrl: string,model:any, uniqueField?:string){
    const results = await this.getAllResults(baseUrl+paramUrl);
    this.logger.debug('Results to create/update from ' + baseUrl+paramUrl + ' is: '+ results.length);

    // Updating the database with the fetched results
    await this.database(results,model, uniqueField)
    this.logger.debug('Updated database from ', baseUrl+paramUrl);
  }

  async fetchData(url: string) {
      try {
      const response = await axios.get(url);
      return response.data;
      } catch (error) {
      this.logger.error('Error fetching data from '+ url, error);
      throw new Error("Error fetching data from " + url);
      }
  }

  // Recursive function to get all results from a paginated API
  async getAllResults(url: string, allResults = []) {
      try {
      const data = await this.fetchData(url);
      const updatedResults = allResults.concat(data.results);

      return data.next ? this.getAllResults(data.next, updatedResults) : updatedResults;
      } catch (error) {
      console.error('Error getting all results: ', error);
      throw error;
      }
    }

  // Function to update or create documents in the database
  async database(results:any[], model:Model<any>, uniqueField: string = 'name'){
    await Promise.all(results.map(async (result) => {
      const query = {};
      query[uniqueField] = result[uniqueField];

      // Update if exists, otherwise create a new document
      const itExists = await model.findOneAndUpdate(query, result).exec();
      if (!itExists) {
        const newModel = new model(result);
        await newModel.save();
      }
    }));
  }
}
