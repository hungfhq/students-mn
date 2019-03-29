import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Student } from './student';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class StudentService {
  studentList: AngularFireList<any>;
  selectedStudent: Student = new Student();

  constructor(
    public toastr: ToastrService,
    private firebase: AngularFireDatabase,
    ) { }

  getData() {
    return this.studentList = this.firebase.list('students-list');
  }

  insertStudent(student: Student) {
    this.studentList.push({
      name: student.name,
      alias: this.convertNameToAlias(student.name),
      gender: student.gender,
      class: student.class,
      code: student.code
    });
  }

  updateStudent(student: Student) {
    this.studentList.update(student.$key, {
      name: student.name,
      alias: this.convertNameToAlias(student.name),
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
    if (confirm('Are you sure to delete this record ?') === true) {
      this.deleteStudent(key);
      this.toastr.warning('Deleted Successfully', 'A student has been remove');
      console.log('do remove');
    }
  }

  convertToEnChar(str: string) {
    let characters = str.trim().toLowerCase();
    characters = characters.replace('á', 'a');
    characters = characters.replace('à', 'a');
    characters = characters.replace('ả', 'a');
    characters = characters.replace('ã', 'a');
    characters = characters.replace('ạ', 'a');

    characters = characters.replace('ă', 'a');
    characters = characters.replace('ằ', 'a');
    characters = characters.replace('ắ', 'a');
    characters = characters.replace('ẳ', 'a');
    characters = characters.replace('ẵ', 'a');
    characters = characters.replace('ặ', 'a');

    characters = characters.replace('â', 'a');
    characters = characters.replace('ầ', 'a');
    characters = characters.replace('ấ', 'a');
    characters = characters.replace('ẩ', 'a');
    characters = characters.replace('ẫ', 'a');
    characters = characters.replace('ậ', 'a');

    characters = characters.replace('đ', 'd');

    characters = characters.replace('è', 'e');
    characters = characters.replace('é', 'e');
    characters = characters.replace('ẻ', 'e');
    characters = characters.replace('ẽ', 'e');
    characters = characters.replace('ẹ', 'e');

    characters = characters.replace('ê', 'e');
    characters = characters.replace('ề', 'e');
    characters = characters.replace('ế', 'e');
    characters = characters.replace('ể', 'e');
    characters = characters.replace('ễ', 'e');
    characters = characters.replace('ệ', 'e');

    characters = characters.replace('ò', 'o');
    characters = characters.replace('ó', 'o');
    characters = characters.replace('ỏ', 'o');
    characters = characters.replace('õ', 'o');
    characters = characters.replace('ọ', 'o');

    characters = characters.replace('ơ', 'o');
    characters = characters.replace('ờ', 'o');
    characters = characters.replace('ớ', 'o');
    characters = characters.replace('ở', 'o');
    characters = characters.replace('ỡ', 'o');
    characters = characters.replace('ợ', 'o');

    characters = characters.replace('ô', 'o');
    characters = characters.replace('ồ', 'o');
    characters = characters.replace('ố', 'o');
    characters = characters.replace('ỗ', 'o');
    characters = characters.replace('ộ', 'o');

    characters = characters.replace('ù', 'u');
    characters = characters.replace('ú', 'u');
    characters = characters.replace('ủ', 'u');
    characters = characters.replace('ũ', 'u');
    characters = characters.replace('ụ', 'u');

    characters = characters.replace('ư', 'u');
    characters = characters.replace('ừ', 'u');
    characters = characters.replace('ứ', 'u');
    characters = characters.replace('ữ', 'u');
    characters = characters.replace('ử', 'u');
    characters = characters.replace('ự', 'u');
    return characters;
  }

  convertNameToAlias(name: string) {
    let alias = '';
    // console.log(name);
    const wArr = this.convertToEnChar(name).split(' ');
    wArr.map(w => {
      alias += w.charAt(0);
    });
    // name = this.convertToEnChar(name).replace(/\s/g, '');
    name = this.convertToEnChar(name);
    alias += ' ';
    alias += name;
    return alias.toString();

  }

}
