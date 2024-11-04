import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  fbUrl: any;
  twitUrl: any;
  instaUrl: any;

  ngOnInit() {
    this.fbUrl = 'https://www.facebook.com/SpotOnMoney/?ref=br_rs';
    this.twitUrl = 'https://twitter.com/SpotonMoney';
    this.instaUrl = 'https://twitter.com/SpotonMoney';
  }

  trackClickActivity(event: string) {
    let activityNameResult;

    if (event === 'logo') {
      activityNameResult = event;
    } else {
      activityNameResult = event + ' link';
    }

    const data = {
      screenName: 'Home Page',
      module: 'Footer',
      subModule: '',
      activityName: 'Clicked footer ' + activityNameResult,
    };
  }
}
