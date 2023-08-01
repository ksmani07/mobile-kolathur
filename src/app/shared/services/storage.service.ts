import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }
  
  public  async get(key:string){
   let value = await this._storage?.get(key);
   return value;
  }

  public async  remove(key:string){
    await this._storage?.remove(key);
  }

  public async clear(){
    await this._storage?.clear();
  }

}
