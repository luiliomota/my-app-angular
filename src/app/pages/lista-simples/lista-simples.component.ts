import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-lista-simples',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './lista-simples.component.html',
  styleUrl: './lista-simples.component.css'
})
export class ListaSimplesComponent implements OnInit{

  users: User[] = [];
  constructor(private router: Router, public service: UserService){}
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void{
    this.service.getUsers().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.users = response;
        },
        error: (erro: any) => {
          console.log('ocorreu algum erro');
          console.log(erro);
        }
      }
    )
  }
  goToDetail(user: User){
    this.router.navigate(['detalhe', user.id, user.phone]);
  }
}
