import { Module } from '@nestjs/common';
import { StarWarsModule } from './star-wars/star-wars.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),MongooseModule.forRoot(process.env.DATABASE_URL),StarWarsModule],
  providers: [],
})
export class AppModule {}
