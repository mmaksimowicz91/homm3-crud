import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  addPlayer(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/players', data);
  }

  getPlayerList(): Observable<any> {
    return this.http.get('http://localhost:3000/players');
  }
}
