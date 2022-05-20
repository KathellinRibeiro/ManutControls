import { map } from 'rxjs/operators';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfigService } from 'src/services/configService';
import { Result, ResultContent } from 'src/models/result';
import { MessageService } from 'src/services/messageService';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Manutencoes } from 'src/models/Manutencoes';
import { ManutencaoService } from '../services/serviceManutencao/manutencao.service';
import {MatDialog} from '@angular/material/dialog';
import { DeleteComponent } from '../dialog/dialog-delete/delete/delete.component';
import { ManutDialogComponent } from '../dialog/dialog-Manut/manut-dialog/manut-dialog.component';

import { List } from 'src/app/listTest/setor.js';
import { Observable, Subject } from 'rxjs';
import { Status } from 'src/models/Status';

var tipoManutencao: Manutencoes[] = [
  { Tipo: "Preventiva" },
  { Tipo: "Corretiva" },
  { Tipo: "Preditiva" },
]

var statusManutencao: Manutencoes[] = [
  { StatusManutencao: "Em Andamento..." },
  { StatusManutencao: "Não Iniciada..." },
  { StatusManutencao: "Concluída" },
]

/* var Setores: Manutencoes[] =
[
  { Setor: "TI" },
  { Setor: "Automações" },
  { Setor: "Governança" },
  { Setor: "Produção x" },
  { Setor: "Produção y" },
  { Setor: "Produção z" },
  { Setor: "Produção k" },
  { Setor: "Produção l" },
  { Setor: "Produção m" },
  { Setor: "Produção b" }
] */

var Responsaveis: Manutencoes[] = [
  { Funcionario: "Jean" },
  { Funcionario: "Pedro" },
  { Funcionario: "Kathellin" },
  { Funcionario: "Vinicius" },
]

var Manutencoess: Manutencoes[] = []

var list: Manutencoes[] = []

/* var list: Manutencoes[] = [
  { _id: 1, TipoManutencao: "Preventiva", ResumoManutencao: "Verificar troca mangueira", StatusManutencao: "Em Andamento...", DataAbertura: new Date(Date.parse("02/03/2022")), Setor: "Produção x", Responsavel: "Kathellin"},
  { _id: 2, TipoManutencao: "Corretiva", ResumoManutencao: "maquina não liga", StatusManutencao: "Concluída", DataAbertura: new Date(Date.parse("03/20/2021")), Setor: "Produção y", Responsavel: "Pedro"},
  { _id: 3, TipoManutencao: "Preditiva", ResumoManutencao: "troca do rolamento do motor", StatusManutencao: "Não Iniciada...", DataAbertura: new Date(Date.parse("07/13/2021")), Setor: "Produção z", Responsavel: "Jean"},
  { _id: 4, TipoManutencao: "Corretiva", ResumoManutencao: "vazamento na bomba", StatusManutencao: "Em Andamento...", DataAbertura: new Date(Date.parse("11/19/2021")), Setor: "Produção k", Responsavel: "Vinicius"},
] */

const subject: Subject<void> = new Subject();
const observable: Observable<void> = subject.asObservable();  

@Component({
  selector: 'app-manutencoes',
  templateUrl: './manutencoes.component.html',
  styleUrls: ['./manutencoes.component.css']
})
export class ManutencoesComponent implements AfterViewInit {
  private _http: HttpClient;
  private _config: ConfigService;
  private _messager: MessageService;
  tipomanutencoes=tipoManutencao;
  statusManus=statusManutencao;
  responsaveis=Responsaveis;
  lists=list
  manutencoess=Manutencoess;

  tipoManutencaoSelect: string;
  statusManutencaoSelect: string;
  equipamentoSelect: string;
  responsavelSelect: string;
  dataSelect: Date;

  displayedColumns: string[] = ['tipoManutencao', 'resumoManutencao', 'diaAbertura', 'setor', 'responsavel', 'Ações'];
  dataSource: MatTableDataSource<Manutencoes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(http: HttpClient,
    config: ConfigService,
    messager: MessageService,
    public dialog: MatDialog,
    private manutencaoService: ManutencaoService) { 
      this._config = config;
      this._http = http;
      this._messager = messager;

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })

      //this.getManutencao();
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  openDialog(manutencao: Manutencoes) {
    /* this.dialog.open(EstoqueDialogComponent); */
    var teste = manutencao;
    const dialogRef = this.dialog.open(ManutDialogComponent, {
      data: {
        _id: manutencao._id,
        Tipo: manutencao.Tipo,
        Descricao: manutencao.Descricao,
        Data: manutencao.Data,
        Equipamento: manutencao.Equipamento,
        Funcionario: manutencao.Funcionario,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Deu certo!");
      var estoqueModel: Manutencoes = result;

      this.manutencaoService.updateManutencao(estoqueModel._id, estoqueModel).subscribe(() => {
        console.log("Deu certo denovo cara!");
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })
    });
  }

  openDialogAdd(){
    const dialogRef = this.dialog.open(ManutDialogComponent, {
      data: {
        _id: '',
        Tipo: '',
        Descricao: '',
        Data: '',
        Equipamento: '',
        Funcionario: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Incluiu!');
      var manutModel: Manutencoes = result;

      manutModel._id = "";

      this.manutencaoService.adicionalManutencao(manutModel).subscribe(() => {
        console.log('Incluiu de vdd!');
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })
    })

    
  }

  openDialogDelete(estoque: Manutencoes){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        _id: estoque._id,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('por enquanto, blz');
      var estoqueModal: Manutencoes = result;

      this.manutencaoService.deleteManutencao(estoqueModal._id).subscribe(() => {
        console.log('Excluiu!');
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })

      this.manutencaoService.getManutencoes().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.manutencoess = res;
        this.dataSource = new MatTableDataSource<Manutencoes>(this.lists);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  tipoManutencaoFilter() {
    const filterValue  = this.tipoManutencaoSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  statusManutencaoFilter() {
    const filterValue  = this.statusManutencaoSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  equipamentoFilter() {
    const filterValue  = this.equipamentoSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  responsavelFilter() {
    const filterValue  = this.responsavelSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataFilter(event: Event) {
    const filterValue  = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getManutencao() {
    this.dataSource = new MatTableDataSource<Manutencoes>(list);
    this.dataSource.paginator = this.paginator;
  }

}
