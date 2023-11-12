import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';

export type StarshipDocument = HydratedDocument<Starship>;

@Schema()
export class Starship {
    @Prop({ required: true })
    name: string; // The common name of this starship, such as "Death Star".

    @Prop()
    model: string; // The model or official name of this starship, such as "T-65 X-wing" or "DS-1 Orbital Battle Station".

    @Prop()
    starship_class: string; // The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation".

    @Prop()
    manufacturer: string; // The manufacturer(s) of this starship. Comma separated if more than one.

    @Prop()
    cost_in_credits: string; // The cost of this starship new, in galactic credits.

    @Prop()
    length: string; // The length of this starship in meters.

    @Prop()
    crew: string; // The number of personnel needed to run or pilot this starship.

    @Prop()
    passengers: string; // The number of non-essential people this starship can transport.

    @Prop()
    max_atmosphering_speed: string; // The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.

    @Prop()
    hyperdrive_rating: string; // The class of this starship's hyperdrive.

    @Prop()
    MGLT: string; // The Maximum number of Megalights this starship can travel in a standard hour.

    @Prop()
    cargo_capacity: string; // The maximum number of kilograms that this starship can transport.

    @Prop()
    consumables: string; // The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.

    @Prop([String])
    films: string[]; // An array of Film URL Resources that this starship has appeared in.

    @Prop([String])
    pilots: string[]; // An array of People URL Resources that this starship has been piloted by.

    @Prop()
    url: string; // The hypermedia URL of this resource.

    @Prop()
    created: string; // The ISO 8601 date format of the time that this resource was created.

    @Prop()
    edited: string; // The ISO 8601 date format of the time that this resource was edited.
  }

  export const StarshipSchema = SchemaFactory.createForClass(Starship);
