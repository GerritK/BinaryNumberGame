import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatSlideToggleModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {BitbarComponent} from './components/bitbar/bitbar.component';
import {DisplayComponent} from './components/display/display.component';
import {TimerComponent} from './components/timer/timer.component';
import {GameService} from './services/game.service';

import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/interval';
import {MomentModule} from 'angular2-moment';
import {HighscoreService} from './services/highscore.service';

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
    FormsModule,
    MomentModule,

    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [
    GameService,
    HighscoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
