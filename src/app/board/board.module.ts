import { ShareModule } from './../share/share.module';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteComponent } from './write/write.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ViewComponent } from './view/view.component';


@NgModule({
    imports: [
        CommonModule,
        BoardRoutingModule,
        ShareModule,
        HttpClientModule
    ],
    declarations: [
        BoardComponent,
        WriteComponent,
        TimeAgoPipe,
        ViewComponent
    ]
})
export class BoardModule {}
