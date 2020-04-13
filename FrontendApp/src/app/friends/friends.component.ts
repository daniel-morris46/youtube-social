import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {YoutubeApiService} from '../youtube-api/youtube-api.service';
import {of} from 'rxjs';
import {Profile} from '../models/profile';
import {BackendApiService} from '../backend-api/backend-api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {

  public profile: Profile;
  public friends: User[];
  public otherUsers: User[];
  public currentUser: User;

  constructor(private authService: AuthService,
              private youtubeApiService: YoutubeApiService,
              private backendApiService: BackendApiService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.youtubeApiService.getProfile(this.authService.getAccessToken()).subscribe((profile: Profile) => {
      this.profile = profile;
    });
    this.authService.getUser().pipe(
      switchMap((user: User) => {
        if (user) {
          return this.backendApiService.getFriends(user.id);
        } else {
          return of([]);
        }
      })
    ).subscribe((friends: User[]) => {
      this.friends = friends;
      this.backendApiService.getUsers().subscribe((users: User[]) => {
        this.currentUser = users.find((user) => this.profile && user.channelId === this.profile.id);
        this.otherUsers = users.filter(user =>
          !this.friends.some((friend) => friend.id === user.id) && this.profile && user.id !== this.currentUser.id
        );
      });
    });
  }

  public removeFriend(friendToRemove: User) {
    this.backendApiService.removeFriend(this.currentUser.id, friendToRemove.id).subscribe(() => {
      this.friends = this.friends.filter((friend) => friend.id !== friendToRemove.id);
      this.otherUsers.push(friendToRemove);
      this.toastr.success('Successfully removed ' + friendToRemove.name + ' as a friend.');
    });
  }

  public addFriend(friendToAdd: User) {
    this.backendApiService.addFriend(this.currentUser.id, friendToAdd.id).subscribe(() => {
      this.otherUsers = this.otherUsers.filter((otherUser) => otherUser.id !== friendToAdd.id);
      this.friends.push(friendToAdd);
      this.toastr.success('Successfully added ' + friendToAdd.name + ' as a friend.');
    });
  }
}
