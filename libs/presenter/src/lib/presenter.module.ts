import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Presenter } from './presenter';

@NgModule({
	imports: [CommonModule],
	providers: [Presenter]
})
export class PresenterModule {}
