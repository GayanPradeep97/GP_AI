import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-blog-detail-view-page',
  templateUrl: './blog-detail-view-page.component.html',
  styleUrls: ['./blog-detail-view-page.component.sass'],
})
// export class BlogDetailViewPageComponent {}
export class BlogDetailViewPageComponent implements OnInit {
  blogDetails: any;
  previousPermalink: any;
  nextPermalink: any;
  permalink!: string;
  blogHeadingDetails: any;
  blogHeading: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const blogId = params['id'];
      this.permalink = blogId;
      this.getblogPermaLink();
      // console.log('permalink', this.permalink);
    });

    // this.getblogPermaLink();
  }

  navigatePrevPost(receivedData: any) {
    this.router.navigate(['/blog', receivedData]);
    this.getblogPermaLink(receivedData);
  }
  navigateNextPost(receivedData: any) {
    this.router.navigate(['/blog', receivedData]);
    this.getblogPermaLink(receivedData);
  }
  getblogPermaLink(receivedData: any = null) {
    const data: any = {};
    data['permalink'] = receivedData ? receivedData : this.permalink;
    this.blogService.getBlogPermalink(data).subscribe({
      next: (res) => {
        if (res['responseDto']) {
          this.blogHeading = res['responseDto'];
          this.blogDetails = res['responseDto']['blogHeadingListDtos'];
          this.blogHeadingDetails =
            res['responseDto']['blogHeadingListDtos'][
              'blogHeadingDetailsListDtos'
            ];
          // console.log(this.blogDetails);
        }
      },
      error: (e) => {
        this.blogDetails = [];
      },
    });
  }
}
