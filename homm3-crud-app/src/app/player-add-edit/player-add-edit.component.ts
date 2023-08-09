import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayersService } from '../services/players.service';
import { DialogRef } from '@angular/cdk/dialog';

interface HeroData {
  [key: string]: string[];
}

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss'],
})
export class PlayerAddEditComponent {
  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private dialogRef: DialogRef<PlayerAddEditComponent>
  ) {
    this.playerForm = this.fb.group({
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      country: '',
      dateOfBirth: '',
      gender: '',
      preferredTypeOfHero: '',
      preferredStartingBonus: '',
      favoriteFaction: '',
      favoriteHero: '',
      yourSkill: '',
      yourExperience: '',
    });
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
      this.playersService.addPlayer(this.playerForm.value).subscribe({
        next: (val: any) => {
          alert('Player Added Successfully!');
          this.dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
