import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    exports:[ 
        FormsModule,
        HttpClientModule
    ]
})
export class ShareModule {}
