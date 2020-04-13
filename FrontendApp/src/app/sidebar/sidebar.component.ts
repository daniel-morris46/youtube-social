import { Component, OnInit } from '@angular/core';
import { faNewspaper, faUserFriends, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, NavigationStart, Router, RouterEvent, UrlSegment} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  faNewspaper = faNewspaper;
  faUserFriends = faUserFriends;
  faThumbsUp = faThumbsUp;

  public currentRoute: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: RouterEvent) => {
      this.currentRoute = event.url;
    });
  }
}
