import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteService } from '../../providers/elite-service/elite-service';



@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;
  constructor(
    private eliteService: EliteService,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content:'Getting tournaments ...'
    })

    loader.present().then(() => {
      this.eliteService.getTournaments().then(x => {
        this.tournaments = x;
        loader.dismiss();
      })
    })

  }


  itemTapped($event, item) {
    this.navCtrl.push(TeamsPage, item);
  }
}

