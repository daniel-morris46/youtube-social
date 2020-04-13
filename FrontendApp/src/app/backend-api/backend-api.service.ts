import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get('/api/users').pipe(
      map((users: any) => {
        return users.map((friend: any) => new User(friend.id, friend.name, friend.channel_id));
      })
    );
  }

  public getFeed(userId): Observable<Post[]> {
    return this.http.get('/api/users/' + userId + '/feed').pipe(
      map((posts: any) => {
        return posts.map((post: any) => new Post(post.id, new Date(post.createddate), post.video_id, post.user_id, post.name))
      })
    );
  }
  public postToFeed(userId, videoId): Observable<any> {
    return this.http.post('/api/users/' + userId + '/feed', {videoId});
  }

  public getUser(channelId): Observable<User> {
    return this.http.get('/api/users/' + channelId).pipe(
      map((data: any) => new User(data.id, data.name, data.channel_id))
    );
  }

  public addUser(name, channelId): Observable<User> {
    return this.http.post('/api/users/', {name, channelId}).pipe(
      map((data: any) => new User(data.id, data.name, data.channel_id))
    );
  }

  public getFriends(userId): Observable<User[]> {
    return this.http.get('/api/users/' + userId + '/friends').pipe(
      map((friends: any) => {
        return friends.map((friend: any) => new User(friend.id, friend.name, friend.channel_id));
      })
    );
  }

  public addFriend(userId, friendUserId): Observable<any> {
    return this.http.post('/api/users/' + userId + '/friends', {userId: friendUserId});
  }

  public removeFriend(userId, friendUserId): Observable<any> {
    return this.http.delete('/api/users/' + userId + '/friends/' + friendUserId);
  }
}
