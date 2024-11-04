import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MyTansactionService } from 'src/app/_services/my-tansaction.service';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent {
  public senderDetailsForm!: FormGroup;
  @Input() mode: any;

  // countryCodes: any;
  AllTransactionData: any;

  countryCodes = [
    {
      value: '+91',
      label: '+91',
    },
  ];

  public distroy$ = new Subject<void>();
  isBenifisaryBankEditable: any;
  isBenifisaryEditable: any;

  allCountryCodes: any;

  constructor(
    private formBuilder: FormBuilder,
    private myTansactionService: MyTansactionService,
    private dataservice: DataService
  ) {}

  ngOnInit() {
    this.senderDetailsForm = this.formBuilder.group({
      senderFirstName: [null],
      senderLastName: [null],
      telephoneLand: [null],
      telephoneMobile: [null],
      emailAddress: [null],
      residentialAddress: [null],
      city: [null],
      state: [null],
      paymentMode: [null],
      code1: [null],
      code2: [null],
    });

    // this.getCostomerTransactionDetails();
    this.senderDetailsForm.patchValue({
      senderFirstName: this.dataservice.saveAllTransactionData.userFirstName,
      senderLastName: this.dataservice.saveAllTransactionData.userLastName,
      code1: this.dataservice.saveAllTransactionData.contactId,
      telephoneLand:
        this.dataservice.saveAllTransactionData.userTelephoneMobile,
      code2: this.dataservice.saveAllTransactionData.mobileId,
      telephoneMobile: this.dataservice.saveAllTransactionData.userMobileNo,
      emailAddress: this.dataservice.saveAllTransactionData.userEmailAddress,
      residentialAddress:
        this.dataservice.saveAllTransactionData.userResidentialAddress,
      city: this.dataservice.saveAllTransactionData.userCity,
      state: this.dataservice.saveAllTransactionData.userState,
      paymentMode: this.dataservice.saveAllTransactionData.userPayAs,
    });

    this.senderDetailsForm.get('senderFirstName')?.disable();
    this.senderDetailsForm.get('senderLastName')?.disable();
    this.senderDetailsForm.get('code1')?.disable();
    this.senderDetailsForm.get('telephoneLand')?.disable();
    this.senderDetailsForm.get('code2')?.disable();
    this.senderDetailsForm.get('telephoneMobile')?.disable();
    this.senderDetailsForm.get('emailAddress')?.disable();
    this.senderDetailsForm.get('residentialAddress')?.disable();
    this.senderDetailsForm.get('city')?.disable();
    this.senderDetailsForm.get('state')?.disable();
    this.senderDetailsForm.get('paymentMode')?.disable();

    this.getAllCountryCode();
  }

  get senderFirstName() {
    return this.senderDetailsForm.get('senderFirstName');
  }
  get senderLastName() {
    return this.senderDetailsForm.get('senderLastName');
  }
  get telephoneLand() {
    return this.senderDetailsForm.get('telephoneLand');
  }
  get telephoneMobile() {
    return this.senderDetailsForm.get('telephoneMobile');
  }
  get emailAddress() {
    return this.senderDetailsForm.get('emailAddress');
  }
  get residentialAddress() {
    return this.senderDetailsForm.get('residentialAddress');
  }
  get city() {
    return this.senderDetailsForm.get('city');
  }
  get state() {
    return this.senderDetailsForm.get('state');
  }
  get paymentMode() {
    return this.senderDetailsForm.get('paymentMode');
  }
  get code1() {
    return this.senderDetailsForm.get('code1');
  }
  get code2() {
    return this.senderDetailsForm.get('code2');
  }

  getAllCountryCode() {
    this.myTansactionService
      .getCountryCode()
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allCountryCodes = res['responseDto'];

          const userCountryCodeId =
            this.dataservice.saveAllTransactionData.mobileId;

          const selectedCounrtyCode = this.allCountryCodes.find(
            (code: { countryCodeId: any }) =>
              code.countryCodeId === userCountryCodeId
          );
          const userCountryCodeId2 =
            this.dataservice.saveAllTransactionData.contactId;

          const selectedCounrtyCode2 = this.allCountryCodes.find(
            (code: { countryCodeId: any }) =>
              code.countryCodeId === userCountryCodeId2
          );

          // this.senderDetailsForm.patchValue({
          //   code1: selectedCounrtyCode ? selectedCounrtyCode.phonePrefix : null,
          //   code2: selectedCounrtyCode2
          //     ? selectedCounrtyCode2.phonePrefix
          //     : null,
          // });
        }
      });
  }
}
