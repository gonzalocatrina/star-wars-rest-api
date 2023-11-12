import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';

export type PeopleDocument = HydratedDocument<People>;

@Schema()
export class People{
    @Prop({ required: true })
    name: string; // The name of this person.

    @Prop()
    birth_year: string; // The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.

    @Prop()
    eye_color: string; // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.

    @Prop()
    gender: string; // The gender of this person. Either "Male", "Female", or "unknown", "n/a" if the person does not have a gender.

    @Prop()
    hair_color: string; // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.

    @Prop()
    height: string; // The height of the person in centimeters.

    @Prop()
    mass: string; // The mass of the person in kilograms.

    @Prop()
    skin_color: string; // The skin color of this person.

    @Prop()
    homeworld: string; // The URL of a planet resource, a planet that this person was born on or inhabits.

    @Prop([String])
    films: string[]; // An array of film resource URLs that this person has been in.

    @Prop([String])
    species: string[]; // An array of species resource URLs that this person belongs to.

    @Prop([String])
    starships: string[]; // An array of starship resource URLs that this person has piloted.

    @Prop([String])
    vehicles: string[]; // An array of vehicle resource URLs that this person has piloted.

    @Prop()
    url: string; // The hypermedia URL of this resource.

    @Prop()
    created: string; // The ISO 8601 date format of the time that this resource was created.

    @Prop()
    edited: string; // The ISO 8601 date format of the time that this resource was edited.
}

export const PeopleSchema = SchemaFactory.createForClass(People);
