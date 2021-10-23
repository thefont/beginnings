import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  write<T>(key: string, value: any): void {
    let storedValue = '';
    if (typeof value === 'string') {
      storedValue = value;
    } else {
      storedValue = JSON.stringify(value);
    }
    localStorage.setItem(key, storedValue);
  }

  get<T>(key: string) {
    const stringifiedValue = localStorage.getItem(key);
    return JSON.parse(stringifiedValue) as T;
  }
}
