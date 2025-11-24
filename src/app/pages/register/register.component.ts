import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // ← Agrega esta importación
import { CommonModule } from '@angular/common';  // ← También necesitas esto
import { AuthService } from '../../core/services/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  // ← Agrega esto
})
export class RegisterComponent {
  formRegister: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.formRegister.invalid) return;
    this.error = '';
    this.loading = true;
    const { email, password } = this.formRegister.value;
    try {
      await this.authService.register(email, password);
    } catch (err) {
      this.error = 'No se pudo registrar el usuario. Revisa los datos o tu conexión.';
    }
    this.loading = false;
  }
}