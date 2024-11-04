import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CorporateAccountBasicInformationComponent } from './corporate-account-basic-information/corporate-account-basic-information.component';
import { CorporateAccountDocumentationComponent } from './corporate-account-documentation/corporate-account-documentation.component';

@Component({
  selector: 'app-create-corporate-account',
  templateUrl: './create-corporate-account.component.html',
  styleUrls: ['./create-corporate-account.component.sass'],
})
export class CreateCorporateAccountComponent {
  current = 0;
  index!: number;
  goNextpage: boolean = false; // goNextpage!: boolean;

  @ViewChild(CorporateAccountBasicInformationComponent)
  basicInfoComponent!: CorporateAccountBasicInformationComponent;
  @ViewChild(CorporateAccountDocumentationComponent)
  documentationComponent!: CorporateAccountDocumentationComponent;

  CreateCorporateForm!: FormGroup;
  agentUserCoporateSenderDetailsId: any;

  // @Output() agentUserCoporateSenderDetailsIdChangeValue = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmitBasicInfor(): void {
    this.basicInfoComponent.submitForm();
  }
  onGoNextpageChange(value: boolean) {
    this.goNextpage = value;
    if (value === true) {
      this.current++;
    }
  }
  onAgentUserCoporateSenderDetailsIdChange(value: string) {
    this.agentUserCoporateSenderDetailsId = value;
  }

  uploadDocuments() {
    this.documentationComponent.uploadDocuments();
  }
}
