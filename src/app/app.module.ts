import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {BitbarComponent} from './components/bitbar/bitbar.component';
import {DisplayComponent} from './components/display/display.component';
import {TimerComponent} from './components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,

    DemoViewComponent,
    GameViewComponent,

    BitbarComponent,
    DisplayComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
