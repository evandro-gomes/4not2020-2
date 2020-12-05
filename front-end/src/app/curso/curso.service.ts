import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiServer: string = environment.apiServer
  private apiUri: string = this.apiServer + 'curso'

  constructor(private http:HttpClient) { }

  listar() {
    return this.http.get(this.apiUri).toPromise()
  }

  excluir(id: string){
    // O método delete nativo doHTTPClient não suporta 
    // a passagem de um body para o back-end
    //return this.http.delete(this.apiServer + 'curso/' + id).toPromise()

    // O método request() pode ser usado com qualquer verbo e aceita a passagem de body
    return this.http.request('DELETE', this.apiUri, {body: {_id: id}}).toPromise()
  }
}
