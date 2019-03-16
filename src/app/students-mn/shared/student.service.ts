import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Student } from './student';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class StudentService {
  studentList: AngularFireList<any>;
  selectedStudent: Student = new Student();

  constructor(
    private firebase: AngularFireDatabase,
    private toastr: ToastrService
    ) { }

  getData() {
    return this.studentList = this.firebase.list('students-list');
  }

  insertStudent(student: Student) {
    this.studentList.push({
      name: student.name,
      gender: student.gender,
      class: student.class,
      code: student.code
    });
  }

  updateStudent(student: Student) {
    this.studentList.update(student.$key, {
      name: student.name,
      gender: student.gender,
      class: student.class,
      code: student.code
    });
  }

  deleteStudent($key: string) {
    this.studentList.remove($key);
  }

  onEdit(student: Student) {
    this.selectedStudent = Object.assign({}, student);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record?') === true) {
      this.deleteStudent(key);
      this.toastr.warning('Delete Successfully');
      console.log('do remove');
    }
  }

}
