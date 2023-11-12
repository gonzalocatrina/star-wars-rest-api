import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop({ required: true })
  title: string; // The title of this film

  @Prop()
  episode_id: number; // The episode number of this film.

  @Prop()
  opening_crawl: string; // The opening paragraphs at the beginning of this film.

  @Prop()
  director: string; // The name of the director of this film.

  @Prop()
  producer: string; // The name(s) of the producer(s) of this film. Comma separated.

  @Prop()
  release_date: Date; // The ISO 8601 date format of film release at original creator country.

  @Prop([String])
  species: string[]; // An array of species resource URLs that are in this film.

  @Prop([String])
  starships: string[]; // An array of starship resource URLs that are in this film.

  @Prop([String])
  vehicles: string[]; // An array of vehicle resource URLs that are in this film.

  @Prop([String])
  characters: string[]; // An array of people resource URLs that are in this film.

  @Prop([String])
  planets: string[]; // An array of planet resource URLs that are in this film.

  @Prop()
  url: string; // The hypermedia URL of this resource.

  @Prop()
  created: string; // The ISO 8601 date format of the time that this resource was created.

  @Prop()
  edited: string; // The ISO 8601 date format of the time that this resource was edited.
}

export const FilmSchema = SchemaFactory.createForClass(Film);
