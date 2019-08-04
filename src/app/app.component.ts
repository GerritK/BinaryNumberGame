import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {NavigationStart, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserIdDialogComponent} from './dialogs/userid-dialog/user-id-dialog.component';

@Component({
  selector: 'bng-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public navLinks = [
    {
      label: 'Demo',
      path: '/demo',
    },
    {
      label: 'Game',
      path: '/game',
    },
    {
      label: 'Leaderboard',
      path: '/leaderboard',
    }
  ];

  constructor(private gameService: GameService,
              private router: Router,
              private dialog: MatDialog) {
    // stop running game on route change
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.gameService.isRunning.getValue()) {
        this.gameService.stopGame();
      }
    });
  }

  public openUserIdDialog() {
    this.dialog.open(UserIdDialogComponent);
  }
}
