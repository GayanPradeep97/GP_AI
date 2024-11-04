import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-id-scan-details',
  templateUrl: './id-scan-details.component.html',
  styleUrls: ['./id-scan-details.component.sass'],
})
export class IdScanDetailsComponent {
  idScanFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private nzModalRef: NzModalRef,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    let data = this.dataService.idScanDetails;
    this.idScanFormGroup = this.fb.group({
      username: [data.userName],
      firstName: [data.firstName],
      lastName: [data.lastName],
      dob: [data.birthDate],
      placeofBirth: [data.birthPlace],
      email: [data.email],
      contact: [data.contactNumber],
      address: [data.address],
      city: [data.city],
      post: [data.postcode],
      country: [data.country],
      nationality: [data.natianlity],
      idType: [data.idType ? data.idType : 'Insurance Card'],
      idNo: [data.idNumber],
      expiry: [data.expDate],
    });
    this.idScanFormGroup.disable();
  }

  close() {
    this.notificationService.create(
      'success',
      'Success',
      'SignedUp successfully',
      { nzStyle: { background: '#00A03E', color: '#fff' } }
    );
    this.nzModalRef.close();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 575) {
      this.close();
    }
  }
}
