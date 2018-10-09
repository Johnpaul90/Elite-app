import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamdetailPage } from '../teamdetail/teamdetail';
import { StandingsPage } from '../standings/standings';
import { MyTeamsPage } from '../my-teams/my-teams';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  public team: any = {}
  public teamDetailsTab = TeamdetailPage;
  public standingTab = StandingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.data;
  }

  goHome() {
    this.navCtrl.push(MyTeamsPage)
    this.navCtrl.popToRoot();
  }

}
