import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton, // Asegúrate de importar IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton, // Incluye IonButton aquí
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;

  constructor() {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocalización no está soportada en este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  openInGoogleMaps() {
    if (this.latitude !== null && this.longitude !== null) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('Coordenadas no disponibles. Asegúrate de que la ubicación esté habilitada.');
    }
  }
}

