import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailserviceService {

  constructor(private http: HttpClient) { }

  createAccount(data: any) {
    this.http.post<any>('', data).subscribe((res) => {
      console.log(res);

    })
  }

}
