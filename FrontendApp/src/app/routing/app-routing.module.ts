import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {FeedComponent} from '../feed/feed.component';
import {LikedVideosComponent} from '../liked-videos/liked-videos.component';
import {FriendsComponent} from '../friends/friends.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'likedVideos', component: LikedVideosComponent },
  { path: '**', redirectTo: 'feed' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
