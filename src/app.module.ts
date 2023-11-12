import { Module } from '@nestjs/common';
import { StarWarsModule } from './star-wars/star-wars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/star-wars'),StarWarsModule],
  providers: [],
})
export class AppModule {}
