import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'homm3-crud-app';

  constructor(private dialog: MatDialog) {}

  openPlayerForm() {
    this.dialog.open(PlayerAddEditComponent);
  }
}
