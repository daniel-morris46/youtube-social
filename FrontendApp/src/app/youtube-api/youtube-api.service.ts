import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Profile} from '../models/profile';
import {Video} from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private profile: Profile;

  constructor(private http: HttpClient) { }

  public getProfile(accessToken): Observable<Profile> {
    if (!this.profile) {
      return this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=' + accessToken).pipe(
        map((data: any) => {
          const profile = new Profile(data.items[0].id, data.items[0].snippet.title, data.items[0].snippet.thumbnails.medium.url);
          this.profile = profile;
          return profile;
        }));
    } else {
      return of(this.profile);
    }
  }

  public getVideo(accessToken, videoId): Observable<Video> {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&access_token=' + accessToken).pipe(
      map((data: any) => {
        return new Video(
          data.items[0].id,
          data.items[0].snippet.title,
          data.items[0].snippet.thumbnails.high.url
        );
      }));
  }

  public getLikedVideos(accessToken): Observable<Video[]> {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?myRating=like&maxResults=20&part=snippet&access_token=' + accessToken).pipe(
      map((data: any) => {
        return data.items.map((video) => new Video(video.id, video.snippet.title, video.snippet.thumbnails.medium.url));
      }));
  }
}
