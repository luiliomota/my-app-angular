import { Component, OnInit } from '@angular/core';
import studentData from '../../students.json';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

interface Student {
  id: Number;
  name: String;
  email: String;
  gender: String;
}

@Component({
  selector: 'app-manipulando-json',
  standalone: true,
  imports: [NgForOf, MatButton],
  templateUrl: './manipulando-json.component.html',
  styleUrl: './manipulando-json.component.css'
})
export class ManipulandoJsonComponent implements OnInit {

  students: Student[] = studentData;

  constructor (private router: Router) {}
  ngOnInit(): void {
    console.log(this.students);
  }

  goToDetail(student: Student){
    this.router.navigate(['detalhe', student.id]);
  }

}
