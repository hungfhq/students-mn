import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from '../shared/student.service';
import { Student } from '../shared/student';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  studentList: Student[];
  students$: Observable<any[]>;
  public show_ul = 'block';
  private searchTerms = new Subject<string>();

  constructor(
    public studentService: StudentService
  ) { }

  ngOnInit() {
    this.creatStudentList();

    this.students$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.searchStudentByAlias2(term)
        // this.searchStudentByName(term)
      )
    );
  }

  creatStudentList() {
    const list = this.studentService.getData();
    list.snapshotChanges().subscribe(item => {
      this.studentList = [];
      item.map(_ => {
        const s = _.payload.toJSON();
        s['$key'] = _.key;
        this.studentList.push(s as Student);
      });
    });
  }

  delayShowChange() {
    setTimeout(() => {
      this.show_ul = 'none';
    }, 150);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  stringToWordArr(str: string) {
    let arr = str.split(' ');
    return arr;
  }

  searchStudentByAlias2(term: string): Observable<any[]> {
    let temp = [];
    this.stringToWordArr(term).forEach(item => {
      temp.push(this.searchStudentByAlias(item));
      console.log(temp);
    })
    let temp2 = [];
    if (temp.length > 1) {
      for (let i = 0; i < temp.length - 1; i++) {
        temp[i].forEach(e => {
          if (temp[i + 1].indexOf(e) !== -1) {
            if (temp2.indexOf(e) === -1) {
              temp2.push(e);
            }
          }
        })
      }
    } else {
      temp2 = temp[0]
    }
    return of(temp2);
  }

  searchStudentByAlias3(term: string): Observable<any[]> {
    let temp = [];
    temp = this.searchStudentByAlias(this.stringToWordArr(term)[0]);
    return of(temp);
  }

  searchStudentByAlias(term: string) {
    term = this.studentService.convertToEnChar(term);
    if (!term) {
      return [];
    }
    if (this.studentList) {
      return (this.studentList.filter(s =>
        s.alias.includes(term)));
    }
  }

  searchStudentByName(term: string): Observable<any[]> {
    term = this.studentService.convertToEnChar(term);
    if (!term) {
      return of([]);
    }
    if (this.studentList) {
      return of(this.studentList.filter(s =>
        s.name.toLowerCase().includes(term)));
    }
  }


}// end class

