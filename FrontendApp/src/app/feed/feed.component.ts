import { Component, OnInit } from '@angular/core';
import {YoutubeApiService} from '../youtube-api/youtube-api.service';
import {BackendApiService} from '../backend-api/backend-api.service';
import {AuthService} from '../auth/auth.service';
import {combineAll, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {Post} from '../models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit {

  public feed: Observable<Post[]>;

  constructor(private backendApiService: BackendApiService,
              private youtubeApiService: YoutubeApiService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.feed = this.authService.getUser().pipe(
      switchMap((user: User) => {
        if (user) {
          return this.backendApiService.getFeed(user.id);
        } else {
          return of([]);
        }
      })
    );
  }
}
