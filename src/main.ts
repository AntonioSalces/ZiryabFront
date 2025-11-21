import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyADRm1ot81xIDrrW3iKu6ywdAd8NR1G0gA",
  authDomain: "ziryab-7006e.firebaseapp.com",
  projectId: "ziryab-7006e",
  storageBucket: "ziryab-7006e.firebasestorage.app",
  messagingSenderId: "708163806772",
  appId: "1:708163806772:web:274c85353970b612c14c61",
  measurementId: "G-WNWVENZL8X"
};


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
}).catch(err => console.error(err));