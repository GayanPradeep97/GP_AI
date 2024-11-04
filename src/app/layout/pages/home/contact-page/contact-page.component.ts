import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { ContactusQueryDataService } from 'src/app/_services/contactus-query-data.service';
import { CountryDataService } from 'src/app/_services/country-data.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.sass'],
})
export class ContactPageComponent {
  public contactForm!: FormGroup;

  queries: any;
  countries: any;
  isOther = false;

  selectedQueyValue: any;

  public unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private contactusQueryDataService: ContactusQueryDataService,
    private countryDataService: CountryDataService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
      contactNumberLength,
    } = MyValidators;
    this.contactForm = this.fb.group({
      query: ['', customRequired('query')],
      fullName: ['', customRequired('fullName')],
      country: ['', customRequired('country')],
      email: [
        null,
        Validators.compose([
          Validators.required,
          customRequired('email'),
          CustomValidators.patternValidator(
            // tslint:disable-next-line:max-line-length
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { has: true }
          ),
        ]),
      ],
      contactNumber: [
        '',
        Validators.compose([
          Validators.required,
          customRequired('Contact Number'),
          contactNumberLength('Contact Number', 15),
        ]),
      ],
      otherTopic: [
        '',
        Validators.compose([
          Validators.required,
          customRequired('Specific Query'),
          maxLength(255),
        ]),
      ],
    });

    this.getQuery();
    this.getCountry();

    this.contactForm
      .get('query')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedQueryName: string) => {
        const selectedQuery = this.queries.find(
          (query: any) => query.queryTypesId === selectedQueryName
        );
        if (selectedQuery) {
          this.selectedQueyValue = selectedQuery.queryTypesName;
        }
      });
  }

  get query() {
    return this.contactForm.get('query');
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }
  get country() {
    return this.contactForm.get('country');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get contactNumber() {
    return this.contactForm.get('contactNumber');
  }
  get otherTopic() {
    return this.contactForm.get('otherTopic');
  }

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control!.invalid) {
          control!.markAsDirty();
          control!.updateValueAndValidity({ onlySelf: true });
          const fieldName = this.getFieldName(field);
          if (fieldName === 'Contact number') {
            this.notificationService.create(
              'error',
              'Input Error',
              'Contact number must be 12 digits long',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          } else if (fieldName === 'Email address') {
            this.notificationService.create(
              'error',
              'Input Error',
              ' Email must be valid email',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          } else {
            this.notificationService.create(
              'error',
              'Input Error',
              fieldName + ' cannot be empty',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        } else if (control instanceof FormGroup) {
          this.validateForm(control);
        }
      }
    });
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'query': {
        return 'Query';
      }
      case 'fullName': {
        return 'Full name';
      }
      case 'country': {
        return 'Country';
      }
      case 'email': {
        return 'Email address';
      }
      case 'contactNumber': {
        return 'Contact number';
      }
      case 'otherTopic': {
        return 'Specific Query';
      }
    }
  }

  getQuery() {
    this.contactusQueryDataService
      .getQueyForContctPage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.queries = res['responseDto'];
          }
        },
        error: () => {
          this.queries = '';
        },
      });
  }

  getCountry() {
    this.countryDataService
      .getCountryForContctPage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.countries = res['responseDto'];
          }
        },
        error: () => {
          this.countries = '';
        },
      });
  }

  submitEnquiry() {
    if (!this.contactForm.valid) {
      this.validateForm(this.contactForm);
    } else {
      let queryValue = '';

      if (this.isOther) {
        queryValue = this.otherTopic!.value;
      } else {
        queryValue = this.query!.value;
      }
      const formData = {
        catagory: queryValue,
        fullName: this.fullName!.value,
        country: this.country!.value,
        email: this.email!.value,
        contactNumber: this.contactNumber?.value,
      };
      this.contactusQueryDataService
        .saveContactUsEnquieryDetails(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            if (res['responseDto'] != null) {
              this.notificationService.create(
                'success',
                'Success',
                'Email have been sent successfully',
                { nzStyle: { background: '#00A03E', color: '#fff' } }
              );
              this.contactForm.reset();
              this.isOther = false;
            } else if (res['responseDto'] && res['errors']) {
              const errorsValue = res['errors'];

              this.notificationService.create('error', 'Error', errorsValue, {
                nzStyle: { background: '#00A03E', color: '#fff' },
              });
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'Email sending failed',
                { nzStyle: { background: '#00A03E', color: '#fff' } }
              );
            }
          },
        });
    }
  }

  isOtherSelected() {
    if (this.selectedQueyValue === 'Others') {
      this.isOther = true;
      this.otherTopic!.setValidators([Validators.required]);
    } else {
      this.isOther = false;
      this.contactForm.patchValue({
        otherTopic: '',
      });
      this.otherTopic!.setValidators([]);
      this.otherTopic!.updateValueAndValidity();
    }
  }
}
