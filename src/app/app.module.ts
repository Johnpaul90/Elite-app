import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TeamdetailPage } from '../pages/teamdetail/teamdetail';
import { TeamsPage } from '../pages/teams/teams';
import { GamePage } from '../pages/game/game';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { EliteService } from '../providers/elite-service/elite-service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserSettingsService } from '../providers/user-settings-service/user-settings-service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { MapPage } from '../pages/map/map';
import { AgmCoreModule } from '@agm/core'
import { SqlStorageService } from '../providers/sql-storage-service/sql-storage-service';
import { SQLite } from '@ionic-native/sqlite';
@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TeamdetailPage,
    TeamsPage,
    GamePage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicModule.forRoot(MyApp, {mode:'ios'}),
    AgmCoreModule.forRoot({ apiKey:'AIzaSyCXvlpxQ0FgDoKt8rvkHldRZA9AiO2JsrE' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamdetailPage,
    MapPage,
    TeamsPage,
    GamePage,
    StandingsPage,
    TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteService,
    UserSettingsService,
    SqlStorageService,
    SQLite
  ]
})
export class AppModule {}
