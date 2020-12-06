import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from './../curso.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    { valor: 'Intermediário' },
    { valor: 'Avançado' }
  ]

  title: string = 'Novo curso'

  constructor(
    private cursoSrv: CursoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    // Verifica se existe o parâmetro id na URL
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1. Acionar o back-end para buscar registro e disponibilizá-lo para edição
        this.curso = await this.cursoSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2. Mudar o título da página
        this.title = 'Editando curso'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: falha ao carregar dados para edição', 'Entendi',
          {duration: 5000})
      }
    }
  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        // 1. Salvar os dados no back-end
        // Se o curso já existir (caso de edição),  ele já terá o atributo _id
        if(this.curso._id){
          await this.cursoSrv.atualizar(this.curso) // atualização
        }
        else {
          await this.cursoSrv.novo(this.curso)
        }
          // 2. Dar o feddback para o usuario
        this.snackBar.open('Dados salvos com sucesso.', 'Entendi',
          {duration: 5000})
        // 3. Voltar ao componente de listagem 
        this.location.back()
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          {duration: 5000})
      }
    }
  }

  voltar(form: NgForm){
    let result = true
    // form.dirty = formulário sujo, não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched){
      result = confirm('Dados não salvos. Deseja realmente voltar?')
    }
    if(result) this.location.back()
  }

}
