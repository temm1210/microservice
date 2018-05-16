import { NgModule } from '@angular/core';
import { JoinComponent } from './join.component';
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
    {path: '', component: JoinComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class JoinRoutingModule {}
