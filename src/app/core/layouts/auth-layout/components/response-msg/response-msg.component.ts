import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-response-msg',
  imports: [],
  templateUrl: './response-msg.component.html',
  styleUrl: './response-msg.component.scss'
})
export class ResponseMsgComponent {
  resMsg = input.required<string>()
}
