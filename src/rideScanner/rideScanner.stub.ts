import { RideScanner } from './rideScanner';

export class RideScannerStub implements RideScanner {
  private _distanceInKm = 0;
  private _outsideParis = false;

  async calculateDistance(departure: string, arrival: string): Promise<number> {
    return await this._distanceInKm;
  }

  async isOutsideParis(arrival: string): Promise<boolean> {
    return await this._outsideParis;
  }

  set distanceInKm(value: number) {
    this._distanceInKm = value;
  }

  set outsideParis(value: boolean) {
    this._outsideParis = value;
  }
}
