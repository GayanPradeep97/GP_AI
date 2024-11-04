import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private common: CommonService) {}
  getBlog(data: any) {
    const url = environment.getBlog + '/' + data;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getBlogPermalink(data: any) {
    const url = environment.blogPermLink;
    let urlParams = new HttpParams();
    urlParams = urlParams.append('permalink', data.permalink);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        // this.responseHandler();
        return response;
      })
    );
  }
  getAgentDetails() {
    const url = environment.blogAgentDetails;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  blog(data: any) {
    const url = environment.blog;
    return this.http.get(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }
}
