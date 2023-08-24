import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/Categoria';
import { OggettoCat } from '../interfaces/OggettoCat';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OggettoRispostaForm } from '../interfaces/OggettoRispostaForm';
import { OggettoGetDomande } from '../interfaces/OggettoGetDomande';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  $subjectEventHome = new BehaviorSubject<OggettoRispostaForm | null>(null);

  myUrl: string = 'https://opentdb.com/api_category.php';
  //https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple
  constructor(private http: HttpClient) {}

  // chiamata get per recuperare le categorie
  getCategory() {
    return this.http.get<OggettoCat>(this.myUrl);
  }

  getDomande(id: number | undefined, difficolta: string | undefined) {
    return this.http.get<OggettoGetDomande>(
      `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficolta}&type=multiple`
    );
  }

  // metodo per sostiuire i entità html nella stringa tipo &#039;
  decodeHTMLEntities(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent || '';
  }
}
