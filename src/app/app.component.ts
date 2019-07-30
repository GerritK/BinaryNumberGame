import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {NavigationStart, Router} from '@angular/router';

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
              private router: Router) {
    // stop running game on route change
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.gameService.isRunning.getValue()) {
        this.gameService.stopGame();
      }
    });
  }
}
