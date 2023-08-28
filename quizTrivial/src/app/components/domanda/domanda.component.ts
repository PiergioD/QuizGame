import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Domanda } from 'src/app/interfaces/Domanda';
import { interval } from 'rxjs';
import { Risposta } from 'src/app/interfaces/Risposta';

@Component({
  selector: 'app-domanda',
  templateUrl: './domanda.component.html',
  styleUrls: ['./domanda.component.scss'],
})
export class DomandaComponent {
  @Input() domandaSingola!: Domanda;

  @Output() ripostaSelezionata = new EventEmitter();

  onClickRisposta(answer: Risposta) {
    this.ripostaSelezionata.emit(answer);
  }

  ngOnInit() {}
}
