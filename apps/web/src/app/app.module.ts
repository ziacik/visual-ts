import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';

import { PresenterModule } from '@visual-ts/presenter';

@NgModule({
	declarations: [AppComponent, ViewerComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot([], { initialNavigation: 'enabled' }),
		PresenterModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
