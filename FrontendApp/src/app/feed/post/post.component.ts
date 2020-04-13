import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {YoutubeApiService} from '../../youtube-api/youtube-api.service';
import {AuthService} from '../../auth/auth.service';
import {Video} from '../../models/video';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  public video$: Observable<Video>;

  constructor(private youtubeApiService: YoutubeApiService,
              private authService: AuthService,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.video$ = this.youtubeApiService.getVideo(this.authService.getAccessToken(), this.post.videoId);
  }

  public openVideo(videoId: string) {
    window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
  }
}
