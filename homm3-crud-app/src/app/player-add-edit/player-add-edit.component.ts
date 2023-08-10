import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayersService } from '../services/players.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

interface HeroData {
  [key: string]: string[];
}

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss'],
})
export class PlayerAddEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private dialogRef: MatDialogRef<PlayerAddEditComponent>,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.playerForm = this.fb.group({
      fullName: '',
      nickname: '',
      email: '',
      country: '',
      dateOfBirth: '',
      gender: '',
      preferredTypeOfHero: '',
      favoriteFaction: '',
      favoriteHero: '',
      yourSkill: '',
    });
  }

  ngOnInit(): void {
    this.playerForm.patchValue(this.data);
  }

  playerForm: FormGroup;

  factions: string[] = [
    'Castle',
    'Inferno',
    'Ramparts',
    'Tower',
    'Stronghold',
    'Dungeon',
    'Necropolis',
    'Fortress',
    'Conflux',
  ];
  skills: string[] = [
    'Beginner',
    'Amateur',
    'Intermediate',
    'Advanced',
    'Veteran',
    'Pro',
  ];
  heroesByFaction: HeroData = {
    Castle: [
      'Christian',
      'Edric',
      'Orrin',
      'Sorsha',
      'Sylvia',
      'Tyris',
      'Valeska',
      'Lord Haart',
      'Adela',
      'Adelaide',
      'Caitlin',
      'Cuthbert',
      'Ingham',
      'Loynis',
      'Rion',
      'Sanya',
    ],
    Inferno: [
      'Calh',
      'Fiona',
      'Ignatius',
      'Marius',
      'Nymus',
      'Octavia',
      'Pyre',
      'Rashka',
      'Ash',
      'Axsis',
      'Ayden',
      'Calid',
      'Olema',
      'Xarfax',
      'Xyron',
      'Zydar',
    ],
    Ramparts: [
      'Clancy',
      'Ivor',
      'Jenova',
      'Kyrre',
      'Mephala',
      'Ryland',
      'Thorgrim',
      'Ufretin',
      'Aeris',
      'Alagar',
      'Coronius',
      'Elleshar',
      'Gem',
      'Malcom',
      'Melodia',
      'Uland',
    ],
    Tower: [
      'Fafner',
      'Iona',
      'Josephine',
      'Neela',
      'Piquedram',
      'Rissa',
      'Thane',
      'Torosar',
      'Aine',
      'Astral',
      'Cyra',
      'Daremyth',
      'Halon',
      'Serena',
      'Solmyr',
      'Theodorus',
    ],
    Stronghold: [
      'Crag Hack',
      'Gretchin',
      'Gurnisson',
      'Jabarkas',
      'Krellion',
      'Shiva',
      'Tyraxor',
      'Yog',
      'Dessa',
      'Gird',
      'Gundula',
      'Oris',
      'Saurug',
      'Terek',
      'Vey',
      'Zubin',
    ],
    Dungeon: [
      'Ajit',
      'Arlach',
      'Dace',
      'Damacon',
      'Gunnar',
      'Lorelei',
      'Shakti',
      'Synca',
      'Alamar',
      'Darkstorn',
      'Deemer',
      'Geon',
      'Jaegar',
      'Jeddite',
      'Malekith',
      'Sephinroth',
    ],
    Necropolis: [
      'Charna',
      'Clavius',
      'Galthran',
      'Isra',
      'Moandor',
      'Straker',
      'Tamika',
      'Vokial',
      'Aislinn',
      'Nagash',
      'Nimbus',
      'Sandro',
      'Septienna',
      'Thant',
      'Vidomina',
      'Xsi',
    ],
    Fortress: [
      'Alkin',
      'Broghild',
      'Bron',
      'Drakon',
      'Gerwulf',
      'Korbac',
      'Tazar',
      'Wystan',
      'Andra',
      'Merist',
      'Mirlanda',
      'Rosic',
      'Styg',
      'Tiva',
      'Verdish',
      'Voy',
    ],
    Conflux: [
      'Erdamon',
      'Fiur',
      'Ignissa',
      'Kalt',
      'Lacus',
      'Monere',
      'Pasis',
      'Thunar',
      'Aenain',
      'Brissa',
      'Ciele',
      'Gelare',
      'Grindan',
      'Labetha',
      'Luna',
    ],
  };

  selectedFaction: string | null = null;
  selectedHero: string | null = null;

  onFactionChange() {
    this.playerForm.get('favoriteHero')?.setValue(null);
  }

  onFormSubmit() {
    if (this.playerForm.valid) {
      if (this.data) {
        this.playersService
          .editPlayer(this.data.id, this.playerForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Player Updated Successfully!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.playersService.addPlayer(this.playerForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Player Added Successfully!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
