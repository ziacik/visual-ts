import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot([], { initialNavigation: 'enabled' }), NgxGraphModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
