import { Domanda } from './Domanda';
import { DomandaPrimaDelMap } from './DomandaPrimaDelMap';

export interface OggettoGetDomande {
  response_code: number;
  results: DomandaPrimaDelMap[];
}
