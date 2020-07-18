import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RouterModule.forRoot([], { initialNavigation: 'enabled' }), NgxGraphModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
