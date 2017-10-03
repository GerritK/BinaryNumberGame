import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatTabsModule, MatButtonModule} from '@angular/material';

import {AppComponent} from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {BitbarComponent} from './components/bitbar/bitbar.component';
import {DisplayComponent} from './components/display/display.component';
import {TimerComponent} from './components/timer/timer.component';
import {GameService} from './services/game.service';

import 'rxjs/add/operator/takeUntil';

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
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
