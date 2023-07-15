import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { P } from '@fullcalendar/core/internal-common';
import { Observable, map } from 'rxjs';
import { Payment } from 'src/app/model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = 'http://localhost:8080/user/payment';

  constructor(private http : HttpClient) { }

  createPayment(paymentData:any): Observable<Payment> {
    return this.http.post<Payment>(`${this.url}/create`, paymentData);
  }

  allPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/readall`).pipe(
      map(response => response as Payment[])
      );
  }

}
