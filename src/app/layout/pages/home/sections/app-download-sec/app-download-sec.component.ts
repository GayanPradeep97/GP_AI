import { Component } from '@angular/core';

@Component({
  selector: 'app-app-download-sec',
  templateUrl: './app-download-sec.component.html',
  styleUrls: ['./app-download-sec.component.sass'],
})
export class AppDownloadSecComponent {
  androidApp: any;
  appleApp: any;

  ngOnInit() {
    this.androidApp =
      'https://play.google.com/store/apps/details?id=com.monex.spotonmoney&hl=en&gl=US';
    this.appleApp = 'https://apps.apple.com/lk/app/spoton-money/id1492884990';
  }
}
