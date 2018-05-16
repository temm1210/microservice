import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'login', loadChildren: './login/login.module#LoginModule' },
    {path: 'join', loadChildren: './join/join.module#JoinModule'},
    {path: 'board', loadChildren: './board/board.module#BoardModule', canActivate:[LoginGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule]
})
export class AppRoutingModule {}
