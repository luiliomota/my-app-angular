import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class HomeComponent implements OnInit {

  constructor() {}
  nome:string = 'Luilio da Silva Mota';
  ngOnInit(): void {
    }

}
