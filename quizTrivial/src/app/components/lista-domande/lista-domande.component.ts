import { Component } from '@angular/core';

import { Domanda } from 'src/app/interfaces/Domanda';
import { Observable, Subscription, interval, map } from 'rxjs';
import { pipe } from 'rxjs';
import { OggettoRispostaForm } from 'src/app/interfaces/OggettoRispostaForm';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Risposta } from 'src/app/interfaces/Risposta';
@Component({
  selector: 'app-lista-domande',
  templateUrl: './lista-domande.component.html',
  styleUrls: ['./lista-domande.component.scss'],
})
export class ListaDomandeComponent {
  oggetFormHome!: OggettoRispostaForm | null;
  arrDomande: Domanda[] = [];
  currentQuestion: number = 0;
  incorrectAnswers: number = 0;
  correctAnswers: number = 0;
  quizCompleto: boolean = false;
  counterSecondi: number = 60;
  interval$: any;

  constructor(private catSRV: CategoriaService) {}

  ngOnInit() {
    // prendo loggetto sprato dall evento e popolo l'oggetto nel componenete che mi serviara per fare la get
    this.catSRV.$subjectEventHome.asObservable().subscribe((oggetto) => {
      this.oggetFormHome = oggetto;
    });
    this.getDomande();
    this.startCounter();
  }
  // prendo le proprieta dell oggetto da lform home e faccio la get per prendere larray che mi serve di domande in base alla difficlta e categoria
  getDomande() {
    this.catSRV
      .getDomande(this.oggetFormHome?.categoria, this.oggetFormHome?.difficolta)
      .pipe(
        map((object) => {
          let domande = object?.results;
          return domande.map((elemento) => {
            let risposteArray = [];
            //creo oggetto con risposta giusta
            let rispostaGIusta = {
              testo: elemento.correct_answer,
              correct: true,
            };
            // controllo se esiste l'array, se si, creami un oggetto  per ogni risposta sbagliata
            let risposteSbagliate: Risposta[] = [];
            if (Array.isArray(elemento.incorrect_answers)) {
              risposteSbagliate = elemento.incorrect_answers.map((element) => {
                return { testo: element, correct: false };
              });
            }
            // ritorno le riposte eincorrette e quella giusta dentro un array
            risposteArray = [rispostaGIusta, ...risposteSbagliate];
            // setto array delle risposte come proprietà di ogni elemento dell array domande
            // oggetto che voglio ritornare dal map
            return {
              questione: this.catSRV.decodeHTMLEntities(elemento.question),
              risposte: risposteArray,
            };
          });
        })
      )
      .subscribe((ris) => {
        this.arrDomande = ris;
        console.log(this.arrDomande);
      });
  }

  handleRispostaSelezionata(currentQ: number, risposta: Risposta) {
    if (currentQ === this.arrDomande.length) {
      this.stopCounter();
      this.quizCompleto = true;
      return;
    }

    if (risposta.correct === true) {
      this.correctAnswers++;
      this.currentQuestion++;
      this.counterSecondi = 60;
    } else {
      this.currentQuestion++;
      this.incorrectAnswers++;
      this.counterSecondi = 60;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((value) => {
      this.counterSecondi--;
      if (this.counterSecondi === 0) {
        this.currentQuestion++;
        this.incorrectAnswers++;
        this.counterSecondi = 60;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  resetCounter() {
    this.stopCounter();
    this.counterSecondi = 60;
    this.startCounter();
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counterSecondi = 0;
  }
}
