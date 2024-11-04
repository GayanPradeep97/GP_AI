import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from 'src/app/_services/blog.service';
import { CommonService } from 'src/app/_services/common.service';
import { SettingService } from 'src/app/_services/setting.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.sass'],
})
export class BlogListPageComponent implements OnInit {
  initialItemCount = 10;
  showAllItems = false;
  currentUser: any;
  user_id: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private blogService: BlogService,
    private settingsService: SettingService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageServiceService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
  }

  blogList: any;

  toggleShowAll() {
    this.showAllItems = !this.showAllItems;
  }

  ngOnInit() {
    // this.getExposableId();
    // console.log(this.currentUser);
    this.getBlogList();
  }
  // getExposableId() {
  //   const data: any = {};
  //   data['username'] = this.currentUser.sub;
  //   this.settingsService
  //     .getExposableIdByUsername(data)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res) => {
  //         this.user_id = res['responseDto'];
  //         // this.getBlogList(this.user_id.agentExposableId);
  //         console.log('id', this.user_id.agentExposableId);
  //       },
  //     });
  // }
  goReadMore(id: string) {
    this.router.navigate(['/blog', id]);
    // console.log(id);
  }

  getBlogList() {
    this.blogService.getBlog('JVb3mfaNS29').subscribe((res) => {
      if (res['responseDto']) {
        this.blogList = res['responseDto'];
      }
    });
  }
}
