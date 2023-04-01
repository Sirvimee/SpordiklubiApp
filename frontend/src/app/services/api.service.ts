import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  addUser(user: User) { 
    return this.http.post(`${this.baseUrl}/users/addnew`, user);
  }

  updateUser(user: User, id: number) {
    return this.http.put(`${this.baseUrl}/users/${id}/update`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/delete/${id}`);
  }

}
