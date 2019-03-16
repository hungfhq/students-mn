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
    }, 10);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  convertToSimpleChar(str: string) {
    let characters = str.trim().replace('ă', 'a');
    characters = characters.replace('â', 'a');
    characters = characters.replace('đ', 'd');
    characters = characters.replace('ê', 'e');
    characters = characters.replace('ơ', 'o');
    characters = characters.replace('ô', 'o');
    characters = characters.replace('ư', 'u');
    return characters;
  }

  searchStudentByName(term: string): Observable<any[]> {
    term = term.trim().toLowerCase();
    if (!term) {
      return of([]);
    }
    return of(this.studentList.filter(s =>
      s.name.toLowerCase().includes(term)));
  }
}

  // searchStudentByName(term: string): Observable<any[]> {
  //   let foundStudents: Observable<any[]>;
  //   term = term.toLowerCase();

  //   const foundList: any = [];
  //   this.studentList.map(s => {
  //     const wArr = s.name.split(' ');
  //     wArr.map(w => {
  //       if (w.length == term.length) {
  //         let match = false;
  //         for (let i = 0; i < w.length; i++) {
  //           this.convertToSimpleChar(w.toLowerCase()).charAt(i) == term.charAt(i) ?
  //             match = true : match = false;
  //         }
  //         if (match == true) {
  //           foundList.push(s);
  //         }
  //       }
  //     });
  //   });
  //   foundStudents = of(foundList);

  //   return foundStudents;

  // }

