import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {IResponse, ITaskRequest, ITaskResponse} from '../model/task.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class TaskService {

    private urlGet: string = environment.urlPath + 'task/';
    private urlFindById: string = environment.urlPath + 'task/findById/';
    private urlCreate: string = environment.urlPath + 'task/create';
    private urlUpdate: string = environment.urlPath + 'task/update/';
    private urlDelete: string = environment.urlPath + 'task/delete/';

    constructor(private http: HttpClient) { }

    getTasks() {
      return this.http.get<IResponse<ITaskResponse[]>>(this.urlGet);
    }
    
    findById(id:number) {
      return this.http.get<IResponse<ITaskResponse>>(this.urlFindById + id);
    }
    
    create(req:ITaskRequest):Observable<IResponse<ITaskResponse>>{
      return this.http.post<IResponse<ITaskResponse>>(this.urlCreate,req);
    }
    
    update(req:ITaskRequest, id:number):Observable<IResponse<ITaskResponse>>{
      return this.http.put<IResponse<ITaskResponse>>(this.urlUpdate + id,req);
    }
    
    delete(id:number) {
      return this.http.delete<IResponse<any>>(this.urlDelete + id);
    }

}