import { CursoService } from './../curso.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {
  // entidade no plural
  cursos: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['nome', 'carga_horaria', 'nivel', 'valor_curso', 'editar', 'excluir']

  constructor(
    private cursoSrv: CursoService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.cursos = await this.cursoSrv.listar()
    console.log(this.cursos)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.cursoSrv.excluir(id)
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
