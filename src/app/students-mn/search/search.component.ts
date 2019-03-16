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
  public show_ul = 'none';
  private searchTerms = new Subject<string>();

  constructor(
    public studentService: StudentService
  ) { }

  ngOnInit() {
    this.creatStudentList();

    this.students$ = this.searchTerms.pipe (
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchStudentByName(term))
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
    }, 25);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  searchStudentByName(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return of(this.studentList.filter(s =>
      s.name.toLowerCase().includes(term.toLowerCase())));
  }

}
