import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import {Todo} from './todo'

import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class TodoService {

  baseUrl = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  handleError(errorResponse: any, cought: Observable<any>): ObservableInput<any> {
    if (errorResponse.error instanceof ErrorEvent) {
        console.log("clinet side error");
        return (errorResponse.error)
    } else {
        console.log("server side error");
        return (errorResponse);
    }
}


  getTodos(): Observable<Todo[]> {

    return this.httpClient.get<Todo[]>(this.baseUrl + "/todos").pipe(catchError(this.handleError));
 }


 AddTodo(todo: Todo | undefined) : Observable<Todo> {

  

    return this.httpClient.post<Todo>("http://localhost:3000/api/todos", todo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError((this.handleError)));

}

DeleteTodos(id: string | undefined): Observable<Todo> {

  return this.httpClient.delete<Todo>(this.baseUrl + "/todos/" + id).pipe(catchError(this.handleError));
}

updateTodo(todo: Todo | undefined) : Observable<void> {

    
  return this.httpClient.put<void>(this.baseUrl + "/todos/" + todo?._id, todo,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError((this.handleError)));

}


}
