import { Injectable } from '@angular/core';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor() {
    this.user$ = new Observable(observer => {
      return onAuthStateChanged(auth, observer);
    });
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Error en login:', error);
      throw this.handleAuthError(error);
    }
  }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  private handleAuthError(error: any): Error {
    let message = 'Error de autenticación';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta';
        break;
      case 'auth/email-already-in-use':
        message = 'El email ya está en uso';
        break;
      case 'auth/weak-password':
        message = 'La contraseña es demasiado débil';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      case 'auth/invalid-credential':
        message = 'Credenciales inválidas';
        break;
      default:
        message = error.message || 'Error desconocido';
    }
    
    return new Error(message);
  }
}