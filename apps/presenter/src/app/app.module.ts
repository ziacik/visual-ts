import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppComponent } from './app.component';
import { HttpModelService } from './http-model.service';
import { ModelService } from './model.service';
import { VsCodeModelService } from './vscode-model.service';
import { XComponent } from './x.component';

console.log('GOT IT?', window['vscode'])

const modelService = window['vscode'] ? VsCodeModelService : HttpModelService;

@NgModule({
	declarations: [AppComponent, XComponent],
	imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, RouterModule.forRoot([
		{ path: '**', component: XComponent }
	], { initialNavigation: 'enabled' }), NgxGraphModule],
	providers: [{
		provide: ModelService,
		useClass: modelService
	}],
	bootstrap: [AppComponent],
})
export class AppModule {}
