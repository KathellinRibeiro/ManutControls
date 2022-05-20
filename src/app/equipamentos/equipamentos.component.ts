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
import { Equipament } from 'src/models/equipamento';
import { EquipamentoService } from '../services/serviceEquipamento/equipamento.service';
import {MatDialog} from '@angular/material/dialog';
import { DeleteComponent } from '../dialog/dialog-delete/delete/delete.component';
import { EquipDialogComponent } from '../dialog/dialog-Equip/equip-dialog/equip-dialog.component';

import { List } from 'src/app/listTest/setor.js';
import { Observable, Subject } from 'rxjs';
import { Status } from 'src/models/Status';

/* var tipoEquip: Equipament[] = [
  { TipoEquip: "Equipamento 1"},
  { TipoEquip: "Equipamento 2"},
  { TipoEquip: "Equipamento 3"},
]; */

var tipoEquip: Equipament[] = []

var statusMaq: Equipament[] = [
  { StatusDesc: "Ativo", Status: "Ativo" },
  { StatusDesc: "Inativo", Status: "Inativo"},
];

/* var Setores: Equipament[] =
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

var Criticidade: Equipament[] =
[
  { Criticidade: "Baixa" },
  { Criticidade: "Média" },
  { Criticidade: "Alta" },
]

var tagsEquip: Equipament[] =
[
  { Tag: "ETQ-001-002" },
  { Tag: "IRJ-002-004" },
  { Tag: "KDO-003-007" },
]

var list: Equipament[] = []
/* var list: Equipament[] = [
  { Id: 1, TipoEquip: "Equipamento 1", Tag: "IRJ-002-004", StatusDesc: "Ativo", Status: true, dataEntrada: new Date(Date.parse("01/01/2022")), Setor: "Produção x", CriticidadeDesc: "Baixa" },
  { Id: 2, TipoEquip: "Equipamento 2", Tag: "KDO-003-007", StatusDesc: "Ativo", Status: true, dataEntrada: new Date(Date.parse("03/22/2022")), Setor: "Produção y", CriticidadeDesc: "Média" },
  { Id: 3, TipoEquip: "Equipamento 1", Tag: "IRJ-002-004", StatusDesc: "Inativo", Status: false, dataEntrada: new Date(Date.parse("12/11/2022")), Setor: "Produção z", CriticidadeDesc: "Alta" },
  { Id: 4, TipoEquip: "Equipamento 3", Tag: "ETQ-001-002", StatusDesc: "Ativo", Status: true, dataEntrada: new Date(Date.parse("02/25/2022")), Setor: "Produção k", CriticidadeDesc: "Baixa" },
  { Id: 5, TipoEquip: "Equipamento 3", Tag: "ETQ-001-002", StatusDesc: "Ativo", Status: true, dataEntrada: new Date(Date.parse("09/09/2022")), Setor: "Produção l", CriticidadeDesc: "Alta" },
  { Id: 6, TipoEquip: "Equipamento 1", Tag: "KDO-003-007", StatusDesc: "Inativo", Status: false, dataEntrada: new Date(Date.parse("11/03/2022")), Setor: "Produção m", CriticidadeDesc: "Média" },
] */

const subject: Subject<void> = new Subject();
const observable: Observable<void> = subject.asObservable();  

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css']
})
export class EquipamentosComponent implements AfterViewInit {
  private _http: HttpClient;
  private _config: ConfigService;
  private _messager: MessageService;
  equipaments=tipoEquip;
  statusMaqs=statusMaq;
  crits=Criticidade;
  tags=tagsEquip;
  lists=list;
  

  equipamentoSelect: string;
  statusSelect: string;
  setorSelect: string;
  critSelect: string;
  tagsSelect: string;

  displayedColumns: string[] = ['Equipamento', 'Tag Equipamento', 'Status do Equipamento', 'Dia da Aquisição', 'Setor', 'Criticidade', 'Ações'];
  dataSource: MatTableDataSource<Equipament>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(http: HttpClient,
    config: ConfigService,
    messager: MessageService,
    private equipamentoService: EquipamentoService,
    public dialog: MatDialog) { 
      this._config = config;
      this._http = http;
      this._messager = messager;

      this.equipamentoService.getEquipamentos().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.lists = res;
        this.equipaments = res;
        this.dataSource = new MatTableDataSource<Equipament>(this.lists);
        this.dataSource.paginator = this.paginator;
      })

      //this.getEquipamentos();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    }

    openDialog(equip: Equipament) {
      /* this.dialog.open(EstoqueDialogComponent); */
      var teste = equip;
      const dialogRef = this.dialog.open(EquipDialogComponent, {
        data: {
          _id: equip._id,
          Descricao: equip.Descricao,
          dataEntrada: equip.dataEntrada,
          Tag: equip.Tag,
          Status: equip.Status,
          Peca: equip.Peca,
          Local: equip.Local,
          Criticidade: equip.Criticidade,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("Deu certo!");
        var equipModel: Equipament = result;
  
        this.equipamentoService.updateEquipamento(equipModel._id, equipModel).subscribe(() => {
          console.log("Deu certo denovo cara!");
        })
  
        this.equipamentoService.getEquipamentos().subscribe(res => {
          console.log(res);
          console.log("Deu get denovo!");
          this.lists = res;
          this.equipaments = res;
          this.dataSource = new MatTableDataSource<Equipament>(this.lists);
          this.dataSource.paginator = this.paginator;
        })

        this.equipamentoService.getEquipamentos().subscribe(res => {
          console.log(res);
          console.log("Deu get denovo!");
          this.lists = res;
          this.equipaments = res;
          this.dataSource = new MatTableDataSource<Equipament>(this.lists);
          this.dataSource.paginator = this.paginator;
        })
      });
    }

    openDialogAdd(){
      const dialogRef = this.dialog.open(EquipDialogComponent, {
        data: {
          _id: '',
          Descricao: '',
          dataEntrada: '',
          Tag: '',
          Status: '',
          Peca: '',
          Local: '',
          Criticidade: '',

        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Incluiu!');
        var equipModel: Equipament = result;
  
        equipModel._id = "";
  
        this.equipamentoService.adicionalEquipamento(equipModel).subscribe(() => {
          console.log('Incluiu de vdd!');
        })
  
        this.equipamentoService.getEquipamentos().subscribe(res => {
          console.log(res);
          console.log("Deu get denovo!");
          this.lists = res;
          this.equipaments = res;
          this.dataSource = new MatTableDataSource<Equipament>(this.lists);
          this.dataSource.paginator = this.paginator;
        })
      })

      
    }

    openDialogDelete(equip: Equipament){
      const dialogRef = this.dialog.open(DeleteComponent, {
        data: {
          _id: equip._id,
        }
      })
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('por enquanto, blz');
        var equipModal: Equipament = result;
  
        this.equipamentoService.deleteEquipamento(equipModal._id).subscribe(() => {
          console.log('Excluiu!');
        })
  
        this.equipamentoService.getEquipamentos().subscribe(res => {
          console.log(res);
          console.log("Deu get denovo!");
          this.lists = res;
          this.equipaments = res;
          this.dataSource = new MatTableDataSource<Equipament>(this.lists);
          this.dataSource.paginator = this.paginator;
        })

        this.equipamentoService.getEquipamentos().subscribe(res => {
          console.log(res);
          console.log("Deu get denovo!");
          this.lists = res;
          this.equipaments = res;
          this.dataSource = new MatTableDataSource<Equipament>(this.lists);
          this.dataSource.paginator = this.paginator;
        })
      })
    }

  tipoEquipamentoFilter() {
    const filterValue  = this.equipamentoSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  statusMaquinaFilter() {
    const filterValue  = this.statusSelect;
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

  critFilter() {
    const filterValue  = this.critSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tagFilter() {
    const filterValue  = this.tagsSelect;
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

  getEquipamentos() {
    this.dataSource = new MatTableDataSource<Equipament>(list);
    this.dataSource.paginator = this.paginator;
  }

  

}
