import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteService } from '../../providers/elite-service/elite-service';
declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  constructor(public eliteService: EliteService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteService.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: 6.500000, //location.latitude,
      lng: 3.350000, //location.longitude,
      zoom: 12,
      markerLabel:games.location
    }
  }

  goToDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`
  }
}
