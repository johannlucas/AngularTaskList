import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../app/models/task';

const _httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private _http: HttpClient) { }

  apiUrl = 'https://schererbrothers-apitasklist.azurewebsites.net/v1/tasks';

  getTasks() {
    return this._http.get(this.apiUrl);
  }

  insertTask(task: Task) {
    task.create_At = new Date();
    task.update_At = new Date();

    return this._http.post(this.apiUrl, task);
  }

  updateTask(task: Task) {
    task.update_At = new Date();

    return this._http.put(this.apiUrl + `/${task.id}`, task);
  }

  deleteTask(task: Task) {
    task.delete_At = new Date();
    return this._http.put(this.apiUrl + `/${task.id}`, task);
  }
}