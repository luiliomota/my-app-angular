import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subroute',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './subroute.component.html',
  styleUrl: './subroute.component.css'
})
export class SubrouteComponent implements OnInit{



  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
  }
  goToPage1(){
    this.router.navigate(['page1'], {relativeTo:this.route})    
  }
  goToPage2(){
    this.router.navigate(['page2'], {relativeTo:this.route})    
  }

}
