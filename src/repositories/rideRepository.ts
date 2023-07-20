import { Ride } from 'src/models/ride';

export interface RideRepository {
  save(ride: Ride): Promise<void>;
}
