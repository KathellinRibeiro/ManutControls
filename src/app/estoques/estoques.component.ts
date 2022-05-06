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
import { Estoque } from 'src/models/Estoque';

import { List } from 'src/app/listTest/setor.js';
import { Observable, Subject } from 'rxjs';
import { Status } from 'src/models/Status';

var Pecas: Estoque[] = [
  { Peca: "Suporte de Tintas" },
  { Peca: "Rolamento" },
  { Peca: "Diafragma" },
  { Peca: "Eixo X" },
]

var Equipamento: Estoque[] = [
  { Equipamento: "Etiquetadora" },
  { Equipamento: "Motor" },
  { Equipamento: "Bomba" },
  { Equipamento: "Esteira" },
]

var list: Estoque[] = [
  { Peca: "Suporte de Tinta", Equipamento: "Etiquetadora", Quantidade: 10, DataRecebimento: new Date(Date.parse("02/30/2022")), DataSaida: new Date(Date.parse("03/05/2022")), CustoMedio: 300 },
  { Peca: "Rolamento", Equipamento: "Motor", Quantidade: 5, DataRecebimento: new Date(Date.parse("03/20/2022")), DataSaida: new Date(Date.parse("03/30/2022")), CustoMedio: 150 },
  { Peca: "Diafragma", Equipamento: "Bomba", Quantidade: 1, DataRecebimento: new Date(Date.parse("03/10/2022")), DataSaida: new Date(Date.parse("03/29/2022")), CustoMedio: 1800 },
  { Peca: "Eixo X", Equipamento: "Esteira", Quantidade: 6, DataRecebimento: new Date(Date.parse("03/19/2022")), DataSaida: new Date(Date.parse("06/01/2022")), CustoMedio: 5000 },
]

@Component({
  selector: 'app-estoques',
  templateUrl: './estoques.component.html',
  styleUrls: ['./estoques.component.css']
})
export class EstoquesComponent implements AfterViewInit {
  private _http: HttpClient;
  private _config: ConfigService;
  private _messager: MessageService;

  pecas=Pecas;
  equipamentos=Equipamento;

  pecaSelect: String;
  equipamentoSelect: String;

  displayedColumns: string[] = ['Peca', 'Equipamento', 'Quantidade', 'DataRecebimento', 'DataSaida', 'CustoMedio', 'Ações'];
  dataSource: MatTableDataSource<Estoque>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(http: HttpClient,
    config: ConfigService,
    messager: MessageService) {
      this._config = config;
      this._http = http;
      this._messager = messager;

      this.getEstoques();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  pecaFilter() {
    const filterValue  = this.pecaSelect;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEstoques() {
    this.dataSource = new MatTableDataSource<Estoque>(list);
    this.dataSource.paginator = this.paginator;
  }

}
