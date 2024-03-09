import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator(),
        ],
      ],
      confirmPassword: [
        null,
        [Validators.required, this.passwordMatchValidator()],
      ],
    });

    this.validateForm.get('password').valueChanges.subscribe((changes) => {
      if (this.confirmPassword.value == null) return;
      if (
        this.confirmPassword.value.length > 0 &&
        this.password.value !== this.confirmPassword.value
      )
        this.confirmPassword.setErrors({ incorrect: true });
    });
  }

  get email(): FormControl {
    return this.validateForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.validateForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.validateForm.get('confirmPassword') as FormControl;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const passwordValid = this.password.value == value;

      return !passwordValid ? { passwordMatch: true } : null;
    };
  }

  onChangePassword(event): void {
    console.log(1);
  }

  submitForm(): void {
    const payload = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService.register(payload).subscribe({
      next: (response) => {
        localStorage.setItem('UserId', response);
        this.router.navigate(['/main/finish/register']);
      },
      error: (error) => {
        console.log(error);
        alert('An account with this email already exists. Please login.');
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
