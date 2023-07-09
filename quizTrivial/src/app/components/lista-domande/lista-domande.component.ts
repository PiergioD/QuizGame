import { Component } from '@angular/core';
import { OggettoRispostaForm } from 'src/app/interfaces/OggettoRispostaForm';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-lista-domande',
  templateUrl: './lista-domande.component.html',
  styleUrls: ['./lista-domande.component.scss'],
})
export class ListaDomandeComponent {
  oggetFormHome!: OggettoRispostaForm;
  arrDomande = [];

  constructor(private catSRV: CategoriaService) {}

  ngOnInit() {
    this.catSRV.$oggettoDalForm.subscribe((oggetto) => {
      console.log(oggetto);
    });

    this.prendiDomande();
  }

  prendiDomande() {}
}
