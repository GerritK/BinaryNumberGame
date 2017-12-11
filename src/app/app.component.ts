import {Component} from '@angular/core';
import {GameService} from './services/game.service';

@Component({
  selector: 'bng-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private gameService: GameService) {
  }

  public onModeChange() {
    this.gameService.stopGame();
  }
}
