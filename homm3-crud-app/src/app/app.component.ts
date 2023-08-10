import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';
import { PlayersService } from './services/players.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'nickname',
    'email',
    'country',
    'dateOfBirth',
    'gender',
    'preferredTypeOfHero',
    'favoriteFaction',
    'favoriteHero',
    'yourSkill',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private playersService: PlayersService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getPlayersList();
  }

  openPlayerForm() {
    const dialogRef = this.dialog.open(PlayerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlayersList();
        }
      },
    });
  }

  getPlayersList() {
    this.playersService.getPlayerList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePlayer(id: number) {
    this.playersService.deletePlayer(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Player deleted!');
        this.getPlayersList();
      },
    });
  }

  editPlayerForm(data: any) {
    const dialogRef = this.dialog.open(PlayerAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlayersList();
        }
      },
    });
  }
}
