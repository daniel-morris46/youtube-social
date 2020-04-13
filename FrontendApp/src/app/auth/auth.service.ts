import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Profile} from '../models/profile';
import {BackendApiService} from '../backend-api/backend-api.service';
import {YoutubeApiService} from '../youtube-api/youtube-api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private googleAccessToken: string;
  private user: BehaviorSubject<User>;

  constructor(private http: HttpClient,
              private backendApiService: BackendApiService,
              private youtubeApiService: YoutubeApiService) {
    if (localStorage.getItem('access_token')) {
      this.googleAccessToken = localStorage.getItem('access_token');
    }
    this.user = new BehaviorSubject<User>(null);
  }

  public obtainAccessToken(): string {
    if (this.googleAccessToken) {
      return this.googleAccessToken;
    } else {
      document.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'scope=https://www.googleapis.com/auth/youtube.readonly&' +
        'response_type=token&' +
        'redirect_uri=http://localhost:4200&' +
        'client_id=84999149204-epjeffa6h2vq38vk4jsnejeko72rsedu.apps.googleusercontent.com';
    }
  }

  public signIn(accessToken: string) {
    this.googleAccessToken = accessToken;
    localStorage.setItem('access_token', accessToken);
    this.youtubeApiService.getProfile(this.googleAccessToken).subscribe((profile) => {
      this.backendApiService.getUser(profile.id).subscribe((user: User) => {
        this.user.next(user);
      }, (error) => {
        if (error.status === 404) {
          this.backendApiService.addUser(profile.name, profile.id).subscribe((user: User) => {
            this.user.next(user);
          });
        }
      });
    });
  }

  public signOut() {
    this.googleAccessToken = null;
    localStorage.removeItem('access_token');
    this.obtainAccessToken();
  }

  public getAccessToken(): string {
    return this.googleAccessToken;
  }

  public getUser(): Observable<User> {
    return this.user.asObservable();
  }
}
