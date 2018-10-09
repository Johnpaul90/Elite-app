import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EliteService } from '../../providers/elite-service/elite-service';
import * as _ from 'lodash';
import { GamePage } from '../game/game';
import momemt from 'moment';
import { UserSettingsService } from '../../providers/user-settings-service/user-settings-service';


@Component({
  selector: 'page-teamdetail',
  templateUrl: 'teamdetail.html',
})
export class TeamdetailPage {

  public team: any = {};
  games: any[];
  tourneyData: any;
  teamStanding: any = {};
  dateFilter: string;
  allGames: any[];
  useDateFilter: boolean = false;
  isFollowing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteService: EliteService,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettingsService: UserSettingsService
  ) {

  }

  ionViewDidLoad() {
    this.team = this.navParams.data;

    this.tourneyData = this.eliteService.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games).filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);

        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? 'vs.' : 'at')
        };
      }).value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id })

    this.userSettingsService.isFavoriteTeam(this.team.id.toString()).then(val => this.isFollowing = val);
  }


  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let oponentScore = (isTeam1 ? team1Score : team2Score);
      let winIndicator = teamScore > oponentScore ? 'W:' : 'L:';

      return winIndicator + teamScore + '-' + oponentScore;
    }
    else {
      return '';
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);

  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => momemt(g.time).isSame(this.dateFilter, 'day'))
    }
    else {
      this.games = this.allGames;
    }

  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : ''
  }

  getScoreDisplayBadge(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger'

  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'UnFollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettingsService.unFavouriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team',
                duration: 4000,
                position: 'bottom'
              });
              toast.present()
            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    }
    else {
      this.isFollowing = true;
      this.userSettingsService.favouriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
    }

  }

  refreshAll(refresher) {
    this.eliteService.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }
}
