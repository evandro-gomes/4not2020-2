import { SalaAulaService } from './../../sala-aula/sala-aula.service';
import { ProfessorService } from './../../professor/professor.service';
import { CursoService } from './../../curso/curso.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurmaService } from './../turma.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  turma: any = {} // objeto vazio com nome no singular

  title: string = 'Novo turma'

  // Variáveis para armazenar as listagens de objetos relacionados
  cursos: any = []  //Vetor vazio, nome no PLURAL
  professores: any = []
  salasAula: any = []

  // Dias da semana
  diasSemana: any = [
    {val: 'dom', descr: 'Domingo'},
    {val: 'seg', descr: 'Segunda-feira'},
    {val: 'ter', descr: 'Terça-feira'},
    {val: 'qua', descr: 'Quarta-feira'},
    {val: 'qui', descr: 'Quinta-feira'},
    {val: 'sex', descr: 'Sexta-feira'},
    {val: 'sab', descr: 'Sábado'},
  ]

  constructor(
    private turmaSrv: TurmaService,
    // Services das entidades relacionadas
    private cursoSrv: CursoService,
    private professorSrv: ProfessorService,
    private salaAulaSrv: SalaAulaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    // Verifica se existe o parâmetro id na URL
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1. Acionar o back-end para buscar registro e disponibilizá-lo para edição
        this.turma = await this.turmaSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2. Mudar o título da página
        this.title = 'Editando turma'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: falha ao carregar dados para edição', 'Entendi',
          {duration: 5000})
      }
    }
    // Carrega as listagens das listagens relacionadas
    this.carregarDados()
  }

  async carregarDados(){
    try{
      this.cursos = await this.cursoSrv.listar()
      this.professores = await this.professorSrv.listar()
      this.salasAula = await this.salaAulaSrv.listar()
    }
    catch(erro){
      console.log(erro)
      this.snackBar.open(`ERRO: não foi possível carregar todos os
       dados necessários para a página.`, 'Entendi', {duration: 5000})
    }
  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        // 1. Salvar os dados no back-end
        // Se o turma já existir (caso de edição),  ele já terá o atributo _id
        if(this.turma._id){
          await this.turmaSrv.atualizar(this.turma) // atualização
        }
        else {
          await this.turmaSrv.novo(this.turma)
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
