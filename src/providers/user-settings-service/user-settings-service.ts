import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { FabList } from 'ionic-angular';
import { SqlStorageService } from '../sql-storage-service/sql-storage-service';

const win: any = window;
@Injectable()
export class UserSettingsService {

  private sqlMode = false;
  constructor(private storage: Storage, private sqlStorageService: SqlStorageService) {
    if (win.sqlitePlugin) {
      this.sqlMode = true
    } else {
      console.log('SQLite plugin not installed. Falling back to regular ionic storage')
    }
  }

  favouriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(team.id.toString(), JSON.stringify(item));

    //if (this.sqlMode) {
    //  this.sqlStorageService.set(team.id.toString(), JSON.stringify(item))
    //}
    //else {
    //  this.storage.set(team.id.toString(), JSON.stringify(item));
    //}
  }

  unFavouriteTeam(team: any) {
    this.storage.remove(team.id.toString())
    //if (this.sqlMode) {
    //  this.sqlStorageService.remove(team.id.toString())
    //}
    //else {
    //  this.storage.remove(team.id.toString());
    //}
  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then(value => value ? true : false);
    //if (this.sqlMode) {
    //  return this.sqlStorageService.get(teamId.toString()).then(value => value ? true : false)
    //}
    //else {
    //  return this.storage.get(teamId.toString()).then(val => val ? true : false);
    //}
  }

  getAllFavorites() {
    let results = [];
    this.storage.forEach(data => {
      results.push(JSON.parse(data))
    });
    return results;

    //if (this.sqlMode) {
    //  this.sqlStorageService.getAll()
    //}
    //else {
    //  return new Promise(resolve => {
    //    let result = [];
    //    this.storage.forEach(data => {
    //      result.push(JSON.parse(data));
    //    });
    //    return resolve(result)
    //  });
    //}
  }

  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sqlStorageService.initialzeDatabase();
    }
    else {
      return new Promise(resolve=>resolve())
    }
  }
}
