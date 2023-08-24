import { Component, Input } from '@angular/core';
import { Domanda } from 'src/app/interfaces/Domanda';

@Component({
  selector: 'app-domanda',
  templateUrl: './domanda.component.html',
  styleUrls: ['./domanda.component.scss'],
})
export class DomandaComponent {
  @Input() domanda!: Domanda;

  ngOnInit() {}
}
