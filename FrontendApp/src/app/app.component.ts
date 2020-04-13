import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {skip} from 'rxjs/operators';
import {HashLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private hashLocationStrategy: HashLocationStrategy,
              private router: Router) {
  }

  ngOnInit(): void {
    let accessToken = this.getParameterByName('access_token');
    if (!accessToken) {
      accessToken = this.authService.obtainAccessToken();
    } else {
      this.router.navigate(['/feed']);
    }
    this.authService.signIn(accessToken);
  }

  // method taken from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  getParameterByName(name) {
    const url  = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[#&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
