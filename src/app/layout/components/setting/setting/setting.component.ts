import { Component } from '@angular/core';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass'],
})
export class SettingComponent {
  constructor(public dataService: DataService) {}

  ngOnInit() {
    if (this.dataService.popupClick === false) {
      this.dataService.settingtSelectedIndex = 0;
    }
  }
}
