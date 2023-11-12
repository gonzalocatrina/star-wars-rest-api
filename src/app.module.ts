import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarWarsModule } from './star-wars/star-wars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/star-wars'),StarWarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
