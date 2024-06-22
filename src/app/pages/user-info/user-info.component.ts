import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserReturn } from '../../models/userReturn';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{

  email: string = '';
  user: UserReturn = new UserReturn('',[]);
  constructor(private service: UserService){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.service.getUserById().subscribe({
      next: (response) => {
        console.log('Entrou no response');
        console.log(response);
        if(response){
          this.user = response;
          if(this.user.users){
            this.email = this.user.users[0].email;
          }
        }
      },
      error: (erro: any) => {
        console.log('Entrou no erro');
        console.log(erro);
        alert('Usuário ou senha inválidos!');
      }
    })
  }
}
