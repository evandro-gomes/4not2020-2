import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  curso: any = {} // objeto vazio com nome no singular

  niveis: any = [
    { valor: 'Básico' },
    { valor: 'Intermediáro' },
    { valor: 'Avançado' }
  ]

  title: string = 'Novo curso'

  constructor() { }

  ngOnInit(): void {
  }

}
