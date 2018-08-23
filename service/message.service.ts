import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService
{

  private message = new Subject<any>();

  constructor()
  {
  }

  sendMessage(message: string, type = 1)
  {
    this.message.next({text: message, type: type});
  }

  getMessage(): Observable<any>
  {
    return this.message.asObservable();
  }

  clearMessage()
  {
    this.message.next();
  }
}
