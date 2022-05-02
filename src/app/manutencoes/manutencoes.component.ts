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

import { List } from 'src/app/listTest/setor.js';
import { Observable, Subject } from 'rxjs';
import { Status } from 'src/models/Status';

var tipoManutencao: Manutencoes[] = [
  { TipoManutencao: "Preventiva" },
  { TipoManutencao: "Corretiva" },
  { TipoManutencao: "Preditiva" },
]

var statusManutencao: Manutencoes[] = [
  { StatusManutencao: "Em Andamento..." },
  { StatusManutencao: "Não Iniciada..." },
  { StatusManutencao: "Concluída" },
]

var Setores: Manutencoes[] =
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
]

var Responsaveis: Manutencoes[] = [
  { Responsavel: "Jean" },
  { Responsavel: "Pedro" },
  { Responsavel: "Kathellin" },
  { Responsavel: "Vinicius" },
]

var list: Manutencoes[] = [
  { Id: 1, TipoManutencao: "Preventiva", ResumoManutencao: "Verificar troca mangueira", StatusManutencao: "Em Andamento...", DataAbertura: new Date(Date.parse("02/03/2022")), Setor: "Produção x", Responsavel: "Kathellin"},
  { Id: 2, TipoManutencao: "Corretiva", ResumoManutencao: "maquina não liga", StatusManutencao: "Concluída", DataAbertura: new Date(Date.parse("03/20/2021")), Setor: "Produção y", Responsavel: "Pedro"},
  { Id: 3, TipoManutencao: "Preditiva", ResumoManutencao: "troca do rolamento do motor", StatusManutencao: "Não Iniciada...", DataAbertura: new Date(Date.parse("07/13/2021")), Setor: "Produção z", Responsavel: "Jean"},
  { Id: 4, TipoManutencao: "Corretiva", ResumoManutencao: "vazamento na bomba", StatusManutencao: "Em Andamento...", DataAbertura: new Date(Date.parse("11/19/2021")), Setor: "Produção k", Responsavel: "Vinicius"},
]

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
  setoress=Setores;
  responsaveis=Responsaveis;

  tipoManutencaoSelect: string;
  statusManutencaoSelect: string;
  setorSelect: string;
  responsavelSelect: string;
  dataSelect: Date;

  displayedColumns: string[] = ['id', 'tipoManutencao', 'resumoManutencao', 'statusManutencao', 'diaAbertura', 'setor', 'responsavel', 'Ações'];
  dataSource: MatTableDataSource<Manutencoes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(http: HttpClient,
    config: ConfigService,
    messager: MessageService) { 
      this._config = config;
      this._http = http;
      this._messager = messager;

      this.getManutencao();
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
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

  setorFilter() {
    const filterValue  = this.setorSelect;
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
