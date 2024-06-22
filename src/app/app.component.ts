import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      MainComponent,
      HttpClientModule,
      MatButtonModule,
      NgxMaskDirective,
      NgxMaskPipe,
    ],
    providers: [
      provideNgxMask(), 
      UserService,
    ]
})
export class AppComponent {
  title = 'my-app';
}
