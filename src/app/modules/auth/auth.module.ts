import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { SentEmailComponent } from './page/sent-email/sent-email.component';
import { CompleteRegisterComponent } from './page/complete-register/complete-register.component';
import { ForgetPasswordComponent } from './page/forget-password/forget-password.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SentEmailComponent,
    CompleteRegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [AuthRoutingModule, SharedModule, CommonModule],
})
export class AuthModule {}
