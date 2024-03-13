// place files you want to import through the `$lib` alias in this folder.

import type { GeoPoint } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: 'AIzaSyC5OGGA4vhHWEztSzYykBvafcWnrzqSNdY',
    authDomain: 'shuttrspeed.firebaseapp.com',
    projectId: 'shuttrspeed',
    storageBucket: 'shuttrspeed.appspot.com',
    messagingSenderId: '376216069804',
    appId: '1:376216069804:web:e026ae27e440cf41422109',
    measurementId: 'G-8C8JKVRVR3'
};

export interface User {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    location: GeoPoint;
}

export interface UserLocation {
    lat: number;
    lng: number;
}
