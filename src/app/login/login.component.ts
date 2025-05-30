import { Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { IconsToken } from '../icons';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, IconComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  icons = inject(IconsToken);

  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  showPassword: boolean = false;
  form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (!rawForm.email || !rawForm.password) return;

    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.error = true;
        console.error('Email/Password Sign-In error:', error);
      },
    });
  }
}
