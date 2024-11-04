import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { catchError, map } from 'rxjs';
import { user } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class ContactusQueryDataService {

  constructor(private http:HttpClient,private commons:CommonService) { }

  private responseHandler() {
    this.commons.hideLoading();
  }

  getQueyForContctPage(){
    const url = environment.getQuery
    return this.http.get(url)
    .pipe(
      catchError((err:any)=>{
         return this.commons.catchError(err);
      }),
      map((response: any) => {
            this.responseHandler();
            return response;
          })
    )
  }

  saveContactUsEnquieryDetails(formData:any){
    const url = environment.contactUsEmailInquiry;

    return this.http.post<user>(url, formData)
    .pipe(
       map((user: any)=>{
        return user;
      }),
      catchError((err)=>{
        return this.commons.catchError(err);
      })
      )} 
  }

