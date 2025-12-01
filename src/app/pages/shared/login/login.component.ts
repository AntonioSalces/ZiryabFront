import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/firebase-auth.service'; // ← RUTA CORREGIDA
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error = signal(false);
  private router: Router = inject(Router);
  readonly navigateTo: string = '';
  formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.navigateTo =
      this.router.getCurrentNavigation()?.extras.state?.['navigateTo'] ||
      '/dashboard';
  }

  async onSubmit() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    try {
      await this.auth.login(
        this.formLogin.get('email')?.value,
        this.formLogin.get('password')?.value
      );
      this.route.navigate([this.navigateTo]);
    } catch (err: any) {
      console.error('Error:', err);
      this.error.set(true);
    }
  }

  getError(control: string): string {
    const ctrl = this.formLogin.get(control);
    if (!ctrl || !ctrl.errors) return '';

    if (control === 'email') {
      if (ctrl.errors['required']) return 'El email es requerido';
      if (ctrl.errors['email']) return 'Email inválido';
    }
    if (control === 'password') {
      if (ctrl.errors['required']) return 'La contraseña es requerida';
    }
    return '';
  }
}
