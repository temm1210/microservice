import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ShareModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}

