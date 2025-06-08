import { Body, Controller, Get, Post } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
  constructor(private coordinatesService: RiderCoordinatesService) { }
  @Get()
  getRiderCoordinates() {
    return { message: 'Rider coordinates retrieved successfully' };
  }

  @Post()
  saveRiderCoordinates(
    @Body() createCoordinatesDto: CraeteCoordinatesDTO
  ) {
    return this.coordinatesService.saveRiderCoordinates(createCoordinatesDto);
  }
}
