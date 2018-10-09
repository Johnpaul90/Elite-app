import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from "../tournaments/tournaments";
import { EliteService } from "../../providers/elite-service/elite-service";
import { TeamHomePage } from "../team-home/team-home";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, AbstractControl, NgForm } from '@angular/forms';
import { UserSettingsService } from "../../providers/user-settings-service/user-settings-service";

@Component({
  selector: 'my-teams',
  templateUrl: 'my-teams.html',
})

export class MyTeamsPage {
  favorites = [];
    //{
    //  team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
    //  tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //  tournamentName: 'March Madness Tournament'
    //},
    //{
    //  team: { id: 805, name: 'HC Elite', coach: 'Jpaul' },
    //  tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //  tournamentName: 'Holiday Hoops Challenge'
    //}
  
  constructor(private fb: FormBuilder,
    private nav: NavController,
    private userSettingsService: UserSettingsService,
    private loadingController: LoadingController,
    private eliteService: EliteService) { }

  signInForm = this.fb.group({
  username: ['', [Validators.required]],
  password: ['', Validators.required]
})
  ionViewDidLoad() {
    
  }
  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  favoriteTapped($event, item) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteService.getTournamentData(item.tournamentId).subscribe(t => this.nav.push(TeamHomePage, item.team))
  }

  ionViewDidEnter() {
    this.favorites = this.userSettingsService.getAllFavorites();

   // this.userSettingsService.getAllFavorites().then(favs => this.favorites = favs)
  }
}
