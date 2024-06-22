import { Component, OnInit, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GenericValidator } from '../../comum/validador';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { response } from 'express';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent{
  addressForm:any;
  email:any;
  user: User = new User();
  private fb = inject(FormBuilder);

  constructor(private service: UserService,private route: ActivatedRoute){
    this.route.params.forEach((params: Params) => {
      if(params['id'] !== undefined){
        service.getUser(params['id']).subscribe({
          next: (response) => {
            this.user = response;
          },
          error: (erro:any) => {
            console.log(erro);
            alert("Ocorreu algum erro!");
          }
        })
      }
    })

    this.addressForm = this.fb.group({
      name: [this.user.name, Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(70)
      ])],
      email: [this.user.email, Validators.required],
      cpf: [this.user.cpf, Validators.compose([
        Validators.required, GenericValidator.isValidCpf()
      ])],
      dataNascimento: [this.user.dataNascimento, Validators.required],
      phone: [this.user.phone, Validators.required],
      password: [this.user.password, Validators.required]
    });  
    this.email = this.addressForm.controls['email'];
  }

  onSubmit(): void {
    if(this.addressForm.controls['name'].value)
    this.user.name = this.addressForm.controls['name'].value;
    if(this.addressForm.controls['email'].value)
    this.user.email = this.addressForm.controls['email'].value;
    if(this.addressForm.controls['cpf'].value)
    this.user.cpf = this.addressForm.controls['cpf'].value;
    if(this.addressForm.controls['dataNascimento'].value)
    this.user.dataNascimento = this.addressForm.controls['dataNascimento'].value;
    if(this.addressForm.controls['phone'].value)
    this.user.phone = this.addressForm.controls['phone'].value;
    if(this.addressForm.controls['password'].value)
    this.user.password = this.addressForm.controls['password'].value;

    this.service.editUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }
}
