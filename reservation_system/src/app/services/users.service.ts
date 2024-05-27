import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {JuryMember, User, Session, Reservation} from "../model/account.model";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8087/users';
  private baseUrl2 = 'http://localhost:8087/JuryMembers';
  private baseUrl3 = 'http://localhost:8087/Sessions';
  private baseUrl4 = 'http://localhost:8087/Reservations';
  constructor(private http: HttpClient) { }

  public getJury(): Observable<JuryMember[]> {
    return this.http.get<JuryMember[]>(this.baseUrl2);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  public getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseUrl3);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  public deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl3}/${id}`);
  }
  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl4}/${id}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl4, reservation);
  }
  saveSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.baseUrl3, session);
  }

  public SearchUser(keyword: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}?name_like=${keyword}`);
  }

  public SearchReservation(keyword: string): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(`${this.baseUrl4}?name_like=${keyword}`);
  }

  public SearchSessions(keyword: string): Observable<Array<Session>> {
    return this.http.get<Array<Session>>(`${this.baseUrl3}?date_like=${keyword}`);
  }
  public SearchJuryMember(keyword: string): Observable<Array<JuryMember>> {
    return this.http.get<Array<JuryMember>>(`${this.baseUrl2}?id_like=${keyword}`);
  }
  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  getSessionById(sessionId: number): Observable<Session> {
    const url = `${this.baseUrl3}/${sessionId}`;
    return this.http.get<Session>(url);
  }
}
