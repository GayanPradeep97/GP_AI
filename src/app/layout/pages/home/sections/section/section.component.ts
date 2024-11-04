import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass'],
})
export class SectionComponent {
  constructor(private router: Router) {}

  get currentRoute(): string {
    return this.router.url;
  }
}
