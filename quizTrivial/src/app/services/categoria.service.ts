import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/Categoria';
import { OggettoCat } from '../interfaces/OggettoCat';
import { BehaviorSubject, Subject } from 'rxjs';
import { OggettoRispostaForm } from '../interfaces/OggettoRispostaForm';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  $oggettoDalForm = new BehaviorSubject<OggettoRispostaForm | null>(null);

  myUrl: string = 'https://opentdb.com/api_category.php';
  //https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple
  constructor(private http: HttpClient) {}

  // chiamata get per recuperare le categorie
  getCategory() {
    return this.http.get<OggettoCat>(this.myUrl);
  }

  getDomande(id: number, difficolta: string) {
    this.http
      .get(
        `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficolta}&type=multiple`
      )
      .subscribe((ris) => console.log(ris));
  }
}
