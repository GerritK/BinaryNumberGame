import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoViewComponent} from './views/demo/demo-view.component';
import {GameViewComponent} from './views/game/game-view.component';
import {LeaderboardViewComponent} from './views/leaderboard/leaderboard-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoViewComponent
  },
  {
    path: 'game',
    component: GameViewComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardViewComponent
  },
  {
    path: '**',
    redirectTo: 'demo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
