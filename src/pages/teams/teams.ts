import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteService } from '../../providers/elite-service/elite-service';
import * as _ from 'lodash';


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = []
  private allTeams: any;
  private allTeamDivisions: any;
  queryText: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingController: LoadingController,
    private eliteService: EliteService
  ) {
  }

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Getting teams ...'
    })

    loader.present().then(() => {
      this.eliteService.getTournamentData(selectedTournament.id).subscribe((x: any) => {
        
        this.allTeams = x.teams;

        this.allTeamDivisions = _.chain(x.teams).groupBy('division').toPairs().map(item => _.zipObject(['divisionName', 'divisionTeams'], item)).value();
        this.teams = this.allTeamDivisions;
        loader.dismiss();
      })
    })
  }
  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team)
  }

  updateTeams() {
    let queryTextlower = this.queryText.toLowerCase();
    let filteredTeams = [];

    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextlower));

      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams })
      }
    });
    this.teams = filteredTeams; 
  }
}
