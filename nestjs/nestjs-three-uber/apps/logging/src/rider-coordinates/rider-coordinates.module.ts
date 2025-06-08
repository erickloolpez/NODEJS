import { Module } from '@nestjs/common';
import { RiderCoordinatesService } from './rider-coordinates.service';
import { RiderCoordinatesController } from './rider-coordinates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RiderCoodinate, RiderCoordinateSchema } from './schemas/rider-coordinate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RiderCoodinate.name, schema: RiderCoordinateSchema }])],
  providers: [RiderCoordinatesService],
  controllers: [RiderCoordinatesController]
})
export class RiderCoordinatesModule { }
