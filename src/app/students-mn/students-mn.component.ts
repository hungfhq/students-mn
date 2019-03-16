import { Component, OnInit } from '@angular/core';
import { StudentService } from './shared/student.service';

@Component({
  selector: 'app-students-mn',
  templateUrl: './students-mn.component.html',
  styleUrls: ['./students-mn.component.scss'],
  providers: [StudentService]
})
export class StudentsMnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
