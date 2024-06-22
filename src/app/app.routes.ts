import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarComponent } from './pages/listar/listar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { SubrouteComponent } from './pages/subroute/subroute.component';
import { Page1Component } from './pages/subroute/page1/page1.component';
import { Page2Component } from './pages/subroute/page2/page2.component';
import { ManipulandoJsonComponent } from './pages/manipulando-json/manipulando-json.component';
import { PrivadoComponent } from './pages/privado/privado.component';
import { autorizadoGuard } from './guards/autorizado.guard';
import { DetalheComponent } from './pages/detalhe/detalhe.component';
import { ListaSimplesComponent } from './pages/lista-simples/lista-simples.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ModalComponent } from './pages/modal/modal.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'listar', component: ListarComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'editar/:id', component: EditarComponent},
    {path: 'modal', component: ModalComponent},
    {path: 'login', component: LoginComponent},
    {path: 'usuario', component: UserInfoComponent},
    {path: 'listar-simples', component: ListaSimplesComponent},
    {path: 'detalhe/:id/:phone', component: DetalheComponent},
    {path: 'json', component: ManipulandoJsonComponent},
    {path: 'subroute', component: SubrouteComponent,
        children: [
            {path: 'page1', component: Page1Component},
            {path: 'page2', component: Page2Component},
        ]
    },
    {path: 'privado', component: PrivadoComponent,
        canActivate: [autorizadoGuard]
    },
];
