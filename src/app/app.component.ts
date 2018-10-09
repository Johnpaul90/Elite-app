import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { UserSettingsService } from '../providers/user-settings-service/user-settings-service';
import { EliteService } from '../providers/elite-service/elite-service';
import { TeamdetailPage } from '../pages/teamdetail/teamdetail';
import { TeamHomePage } from '../pages/team-home/team-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;
  favoriteTeams = [];
  constructor(public platform: Platform,
    private userSettingsService: UserSettingsService,
    public statusBar: StatusBar,
    public eliteService: EliteService,
    private userSettingService: UserSettingsService,
    private loadingController: LoadingController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   ;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.reFreshFavorites();
      this.splashScreen.hide();

      this.userSettingService.initStorage().then(() => {
        this.rootPage = MyTeamsPage;
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  gotoTournament() {
    this.nav.push(TournamentsPage);
  }

  reFreshFavorites() {
     this.favoriteTeams = this.userSettingsService.getAllFavorites();
    //this.userSettingService.getAllFavorites().then(x => {
    //  this.favoriteTeams = x;
    //})
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data ...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteService.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team))
  }

}
