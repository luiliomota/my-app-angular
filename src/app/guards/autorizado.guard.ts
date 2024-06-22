import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AutorizacaoService } from '../services/autorizacao.service';
import { inject } from '@angular/core';

export const autorizadoGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  ) => {
    const autorizadoService = inject(AutorizacaoService);
    const routerService = inject(Router);

    const usuarioEstaLogao = autorizadoService.obterLoginStatus();

    if (usuarioEstaLogao)
      return true;
    routerService.navigate(['/login']);
    return false;
  };
