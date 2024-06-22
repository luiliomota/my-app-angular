import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { AutorizacaoService } from '../../services/autorizacao.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private service = inject(UserService);
  private router = inject(Router);
  private autorizadoService = inject(AutorizacaoService);
  addressForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email])
    ],
    password: ['', Validators.required]
  });
  email = this.addressForm.controls['email'];

  getErrorMessage() {
    if(this.email.hasError('required')) {
      return 'O email é obrigatório!'
    }
    return this.email.hasError('email') ? 'Você deve preencher um valor válido para o email!' : "";
  }

  onSubmit(): void {
    if (this.autorizadoService.obterLoginStatus())
      this.autorizadoService.deslogar();
    else
      // this.autorizadoService.autorizar();
      this.service.login(this.addressForm.value).subscribe({
        next: (response) => {
          console.log(response.idToken);
          // alert('Dados registrados com sucesso')
          if(response.idToken){
            this.autorizadoService.autorizar(response.idToken);
            this.router.navigate(['/usuario']);
          }
        },
        error: (erro:any) => {
          console.log(erro);
          alert('Ocorreu algum erro!');
        }
      })
    }
}
