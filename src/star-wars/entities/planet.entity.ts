import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema()
export class Planet {

  @Prop({ required: true })
  name: string; // The name of this planet.

  @Prop()
  diameter: string; // The diameter of this planet in kilometers.

  @Prop()
  rotation_period: string; // The number of standard hours it takes for this planet to complete a single rotation on its axis.

  @Prop()
  orbital_period: string; // The number of standard days it takes for this planet to complete a single orbit of its local star.

  @Prop()
  gravity: string; // A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.

  @Prop()
  population: string; // The average population of sentient beings inhabiting this planet.

  @Prop()
  climate: string; // The climate of this planet. Comma separated if diverse.

  @Prop()
  terrain: string; // The terrain of this planet. Comma separated if diverse.

  @Prop()
  surface_water: string; // The percentage of the planet surface that is naturally occurring water or bodies of water.

  @Prop([String])
  residents: string[]; // An array of People URL Resources that live on this planet.

  @Prop([String])
  films: string[]; // An array of Film URL Resources that this planet has appeared in.

  @Prop()
  url: string; // The hypermedia URL of this resource.

  @Prop()
  created: string; // The ISO 8601 date format of the time that this resource was created.

  @Prop()
  edited: string; // The ISO 8601 date format of the time that this resource was edited.
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
