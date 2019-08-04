import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';

import {AppComponent} from './app.component';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {LeaderboardViewComponent} from './views/leaderboard/leaderboard-view.component';
import {BitbarComponent} from './components/bitbar/bitbar.component';
import {DisplayComponent} from './components/display/display.component';
import {TimerComponent} from './components/timer/timer.component';
import {UsernameDialogComponent} from './dialogs/username-dialog/username-dialog.component';
import {GameService} from './services/game.service';

import {MomentModule} from 'ngx-moment';
import {HighscoreService} from './services/highscore.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {A11yModule} from '@angular/cdk/a11y';
import {UserIdDialogComponent} from './dialogs/userid-dialog/user-id-dialog.component';

@NgModule({
  declarations: [
    AppComponent,

    DemoViewComponent,
    GameViewComponent,
    LeaderboardViewComponent,

    BitbarComponent,
    DisplayComponent,
    TimerComponent,

    UsernameDialogComponent,
    UserIdDialogComponent
  ],
  entryComponents: [
    UsernameDialogComponent,
    UserIdDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    A11yModule,

    AppRoutingModule,

    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [
    GameService,
    HighscoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
