import { Component, OnInit } from '@angular/core';
import {YoutubeApiService} from '../youtube-api/youtube-api.service';
import {Profile} from '../models/profile';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public profile: Profile;

  constructor(private youtubeApiService: YoutubeApiService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.youtubeApiService.getProfile(this.authService.getAccessToken()).subscribe((profile) => {
      this.profile = profile;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  goHome(): void {
    this.router.navigate(['/feed']);
  }
}
