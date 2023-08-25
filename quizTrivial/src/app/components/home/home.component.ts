import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';


import { Categoria } from 'src/app/interfaces/Categoria';
import { NgForm } from '@angular/forms';
import { OggettoRispostaForm } from 'src/app/interfaces/OggettoRispostaForm';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories: Categoria[] = [];
  sub!: Subscription;
  rispostaForm: OggettoRispostaForm = {
    name: '',
    categoria: 0,
    difficolta: '',
  };

  constructor(private catSRV: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.getCategorie();
  }

  submitFormHome(f: NgForm) {
    // setto i valori del form nell'oggetto che verra sparato nellevent emitter
    this.rispostaForm.categoria = +f.value.categoria;
    this.rispostaForm.difficolta = f.value.difficolta;
    this.rispostaForm.name = f.value.name;

    // sparo il valore nel subject e lo mando al componenente lista domanda
    this.catSRV.$subjectEventHome.next(this.rispostaForm);
    this.router.navigate(['domande']);
  }

  getCategorie() {
    //faccio chiamata get delle categoria per popolare il select nel template
    this.sub = this.catSRV.getCategory().subscribe((ris) => {
      this.categories = ris.trivia_categories;
      console.log(this.categories);
    });
  }
}
