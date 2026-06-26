// contact.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactModel {
  empFirstName: string;
  empLastName: string;
  empAddress: string;
  empProfile: string;
  synStatus: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7086/api/ContactDetails';

  getAllContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(this.apiUrl);
  }

  createContact(payload: ContactModel): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}