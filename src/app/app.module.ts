import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoViewComponent,
    GameViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
