import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "./models/loginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(userName: string):Observable<LoginResponse> {        
        return this.httpClient.post<LoginResponse>('login', { userName });
    }

    logout() {
        return this.httpClient.post('logout', {});
    }
}