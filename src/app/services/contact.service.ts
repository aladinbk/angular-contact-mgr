import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IContact } from '../models/IContact';
import { Observable, catchError, throwError } from 'rxjs';
import { IGroup } from '../models/IGroup';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl: string =`http://localhost:9000`;
  constructor(private http: HttpClient) { }
  //get contacts
  public getAllcontacts(): Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }
  //get one contact
  public getContact(contactId: string): Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));    
  }
  //Create Contact
  public createContact(contact: IContact) : Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http.post<IContact[]>(dataUrl, contact).pipe(catchError(this.handleError));
  }
  //Update Contact
  public updateContact(contact: IContact, contactId: string) : Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.put<IContact[]>(dataUrl, contact).pipe(catchError(this.handleError));
  }
  //Delete Contact
  public deleteContact(contactId: string) : Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.delete<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }
  //get All groups
  public getAllgroups(): Observable<IGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.http.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }
  //get one group
  public getGroup(contact: IContact): Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.http.get<IGroup>(dataUrl).pipe(catchError(this.handleError));    
  }
  public handleError (error: HttpErrorResponse){
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error : ${error.error.message}`
    }else{
      errorMessage = `Status: ${error.status} \n Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
