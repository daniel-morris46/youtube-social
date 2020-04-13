import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {YoutubeApiService} from '../youtube-api/youtube-api.service';
import {Observable} from 'rxjs';
import {Video} from '../models/video';
import {BackendApiService} from '../backend-api/backend-api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.less']
})
export class LikedVideosComponent implements OnInit {

  public videos$: Observable<Video[]>;

  constructor(private authService: AuthService,
              private youtubeApiService: YoutubeApiService,
              private backendApiService: BackendApiService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.videos$ = this.youtubeApiService.getLikedVideos(this.authService.getAccessToken());
  }

  public share(video: Video) {
    this.authService.getUser().pipe(
      switchMap((user: User) => this.backendApiService.postToFeed(user.id, video.id))
    ).subscribe(() => {
      this.toastr.success('Successfully shared video to your feed.');
    });
  }

  public openVideo(video: Video) {
    window.open('https://www.youtube.com/watch?v=' + video.id, '_blank');
  }
}
