import { Injectable } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoodinate } from './schemas/rider-coordinate.schema';
import { Model } from 'mongoose';

@Injectable()
export class RiderCoordinatesService {
  constructor(
    @InjectModel(RiderCoodinate.name)
    private readonly riderCoordinateModel: Model<RiderCoodinate>
  ) { }
  async saveRiderCoordinates(createCoordinateDTO: CraeteCoordinatesDTO) {
    return await this.riderCoordinateModel.create(createCoordinateDTO);
  }
}
