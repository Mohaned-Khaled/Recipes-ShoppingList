import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthAuthGuardService } from './auth-authGuard.service';
import { AUthInterceptorService } from './auth-interceptor.service';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthAuthGuardService],
      },
    ]),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AUthInterceptorService,
      multi: true,
    },
  ],
})
export class AuthModule {}
