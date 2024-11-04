import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateCorporateAccountComponent } from './layout/components/create-corporate-account/create-corporate-account.component';
import { SEOService } from './_services/seo.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}
  title = 'bankoyo-moneytransfer-customer-ui';
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.seoService.updateTitle(event['title']);
        this.seoService.updateOgUrl(event['ogUrl']);
        //Updating Description tag dynamically with title
        this.seoService.updateDescription(
          event['title'] + event['description']
        );
        // console.log(event);
      });
  }
}
