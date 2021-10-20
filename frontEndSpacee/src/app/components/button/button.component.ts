import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Output() onNewImage: EventEmitter<any> = new EventEmitter();
  @Input() currentDate: any;
  text: any;


  constructor() { }

  ngOnInit(): void {
  }



  onSubmit() {
    if(!this.text) {
      alert('No date to submit')
      return;
    }
      const newDate = this.text;
      this.onNewImage.emit(newDate)
      this.text = ''
      this.currentDate = newDate;

  }


}
