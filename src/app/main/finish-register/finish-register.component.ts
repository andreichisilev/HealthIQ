import { Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finish-register',
  standalone: true,
  imports: [
    NzStepsModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSelectModule,
  ],
  templateUrl: './finish-register.component.html',
  styleUrl: './finish-register.component.scss',
})
export class FinishRegisterComponent {
  index = 0;
  statuses = ['wait', 'wait', 'wait', 'wait', 'wait', 'wait'];
  disabled = [false, true, true, true, true, true];
  steps = [false, true, true, true, true, true];
  date: Date;
  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      lastName: [null, [Validators.required, Validators.minLength(5)]],
      firstName: [null, [Validators.required, Validators.minLength(5)]],
      birthDate: [null, [Validators.required]],
      weight: [
        null,
        [Validators.required, Validators.min(40), Validators.max(300)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(100), Validators.max(220)],
      ],
      fitLevel: [null, [Validators.required]],
      trainingFrequency: [null, [Validators.required]],
      userTarget: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      profilePictureUrl: [null],
    });
  }

  get lastName(): FormControl {
    return this.validateForm.get('lastName') as FormControl;
  }

  get firstName(): FormControl {
    return this.validateForm.get('firstName') as FormControl;
  }

  get birthDate(): FormControl {
    return this.validateForm.get('birthDate') as FormControl;
  }

  get weight(): FormControl {
    return this.validateForm.get('weight') as FormControl;
  }

  get height(): FormControl {
    return this.validateForm.get('height') as FormControl;
  }

  get fitLevel(): FormControl {
    return this.validateForm.get('fitLevel') as FormControl;
  }

  get trainingFrequency(): FormControl {
    return this.validateForm.get('trainingFrequency') as FormControl;
  }

  get userTarget(): FormControl {
    return this.validateForm.get('userTarget') as FormControl;
  }

  get gender(): FormControl {
    return this.validateForm.get('gender') as FormControl;
  }
  get profilePictureUrl(): FormControl {
    return this.validateForm.get('profilePictureUrl') as FormControl;
  }

  submitForm(): void {
    var payload = {
      userId: parseInt(localStorage.getItem('userId')),
      lastName: this.lastName.value,
      firstName: this.firstName.value,
      birthDate: this.birthDate.value,
      weight: parseInt(this.weight.value),
      height: parseInt(this.height.value),
      gender: parseInt(this.gender.value),
      fitLevel: this.fitLevel.value,
      trainingFrequency: parseInt(this.trainingFrequency.value),
      userTarget: this.userTarget.value,
      profilePictureUrl: this.profilePictureUrl.value.substring(
        this.profilePictureUrl.value.lastIndexOf('\\') + 1
      ),
    };
    console.log(payload);
  }

  onIndexChange(event: number): void {
    this.index = event;
    this.statuses[this.index] = 'current';
  }

  isValidForm(): boolean {
    if (this.index == 0) {
      return this.lastName.valid && this.firstName.valid;
    }
    if (this.index == 1) {
      return this.birthDate.valid;
    }
    if (this.index == 2) {
      return this.weight.valid && this.height.valid;
    }
    if (this.index == 3) {
      return (
        this.fitLevel.valid &&
        this.trainingFrequency.valid &&
        this.userTarget.valid
      );
    }
    if (this.index == 4) {
      return this.gender.valid;
    }
    if (this.index == 5) {
      return this.profilePictureUrl.valid;
    }

    return false;
  }

  next(): void {
    if (this.index === 5) {
      //todo: save data
      this.submitForm();
      return;
    }

    this.statuses[this.index] = 'finish';
    this.steps[this.index] = true;
    this.index++;
    this.disabled[this.index] = false;
    this.steps[this.index] = false;
  }

  prev(): void {
    if (this.index === 0) {
      return;
    }
    this.steps[this.index] = true;
    this.index--;
    this.steps[this.index] = false;
  }

  onFileSelect(event) {
    const file: File = event.target.files[0];
    console.log(file);
  }
}
