import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import {AppComponent} from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {BitbarComponent} from './components/bitbar/bitbar.component';
import {DisplayComponent} from './components/display/display.component';
import {TimerComponent} from './components/timer/timer.component';
import {GameService} from './services/game.service';

import {MomentModule} from 'ngx-moment';
import {HighscoreService} from './services/highscore.service';
import {AppRoutingModule} from './app-routing.module';

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

    AppRoutingModule,

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
