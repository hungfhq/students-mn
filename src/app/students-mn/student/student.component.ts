import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(studentForm: NgForm) {
    studentForm.value.$key == undefined ?
    this.studentService.insertStudent(studentForm.value) :
    this.studentService.updateStudent(studentForm.value);
    this.resetForm(studentForm);
    this.toastr.success('Submitted Successfully', 'Student Registered');
  }

  resetForm(studentForm?: NgForm) {
    if (studentForm !== undefined) {
      studentForm.reset();
    }
    this.studentService.selectedStudent = {
      $key: undefined,
      name: '',
      gender: '',
      class: '',
      code: 0
    };
  }

}
