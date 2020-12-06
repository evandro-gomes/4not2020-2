import { TurmaService } from './../turma.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.scss']
})
export class TurmaListComponent implements OnInit {
  // entidade no plural
  turmas: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['nome', 'curso', 'professor', 'dias_semana', 'horario', 'sala_aula', 'editar', 'excluir']

  constructor(
    private turmaSrv: TurmaService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.turmas = await this.turmaSrv.listar()
    console.log(this.turmas)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.turmaSrv.excluir(id)
        // 1. Recarregar oddados da tabela
        this.ngOnInit()
        // 2. Dar feedback para usuário com mensagem
        this.snackBar.open('Item excluído com sucesso.', 'Entendi', {
          duration: 5000 // 5 segundos
        })
      }
      catch(erro){
        // Dar feedback de erro para o usuário
        this.snackBar.open('ERRO: não foi possível excluir o item.', 'Entendi', {
          duration: 5000 // 5 segundos
        })
        console.log(erro)
      }
    }
  }

}
