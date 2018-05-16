import { BoardComponent } from './board.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WriteComponent } from './write/write.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    {path: '', component: BoardComponent},
    {path: 'write', component: WriteComponent},
    {path: 'view/:id', component: ViewComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardRoutingModule {}
