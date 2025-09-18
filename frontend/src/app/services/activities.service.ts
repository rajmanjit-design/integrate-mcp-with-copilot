import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activities, SignupRequest, UnregisterRequest } from '../models/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private apiUrl = 'http://localhost:8000/activities';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activities> {
    return this.http.get<Activities>(this.apiUrl);
  }

  signUp(request: SignupRequest): Observable<any> {
    const params = new URLSearchParams();
    params.set('email', request.email);
    params.set('activity', request.activity);
    return this.http.post(`http://localhost:8000/activities/signup?${params.toString()}`, {});
  }

  unregister(request: UnregisterRequest): Observable<any> {
    const params = new URLSearchParams();
    params.set('email', request.email);
    params.set('activity', request.activity);
    return this.http.post(`http://localhost:8000/activities/unregister?${params.toString()}`, {});
  }
}
