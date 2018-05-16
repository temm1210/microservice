import { ShareModule } from './../share/share.module';
import { JoinComponent } from './join.component';
import { JoinRoutingModule } from './join-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        JoinRoutingModule,
        ReactiveFormsModule,
        ShareModule
    ],
    declarations:[JoinComponent]
})
export class JoinModule {}
