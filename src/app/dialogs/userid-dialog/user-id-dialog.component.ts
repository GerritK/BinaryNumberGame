import {Component} from '@angular/core';
import {HighscoreService} from '../../services/highscore.service';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './user-id-dialog.component.html'
})
export class UserIdDialogComponent {
  private regex = new RegExp('^[0-9a-fA-F]{24}$');

  public formControl = new FormControl(null, [Validators.required, Validators.pattern(this.regex)]);

  constructor(private dialogRef: MatDialogRef<UserIdDialogComponent>,
              private highscoreService: HighscoreService) {
    this.formControl.patchValue(this.highscoreService.userId);
  }

  public delete() {
    this.highscoreService.userId = null;
    this.dialogRef.close();
  }

  public save() {
    if (this.formControl.invalid) {
      return;
    }

    this.highscoreService.userId = this.formControl.value;
    this.dialogRef.close();
  }
}
