import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student';
import { StudentService } from '../shared/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentList: Student[];
  constructor(
    public studentService: StudentService,
  ) { }

  ngOnInit() {
    const list = this.studentService.getData();
    list.snapshotChanges().subscribe(item => {
      this.studentList = [];
      item.forEach(_ => {
        const s = _.payload.toJSON();
        s['$key'] = _.key;
        this.studentList.push(s as Student);
      });
    });
  }

}
