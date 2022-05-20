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
import { Setor } from 'src/models/setor';
import { SetorService } from 'src/app/services/setor.service';
import {MatDialog} from '@angular/material/dialog';
import { DislogEditSetorComponent } from 'src/app/setor/dialog-setor/dislog-edit-setor/dislog-edit-setor.component';
import { DialogDeleteSetorComponent } from 'src/app/setor/dialog-setor/dialog-delete-setor/dialog-delete-setor.component';

import { List } from 'src/app/listTest/setor.js';
import { Observable, Subject } from 'rxjs';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/* var Setores: Setor[] =
[
  { id: 1, nome: "TI" },
  { id: 2, nome: "Automações" },
  { id: 3, nome: "Governança" },
  { id: 4, nome: "Produção x" },
  { id: 5, nome: "Produção y" },
  { id: 6, nome: "Produção z" },
  { id: 7, nome: "Produção k" },
  { id: 8, nome: "Produção l" },
  { id: 9, nome: "Produção m" },
  { id: 0, nome: "Produção b" }
] */
var Setores: Setor[] = [];



/**
 * @title Data table with sorting, pagination, and filtering.
 */

const subject: Subject<void> = new Subject();
const observable: Observable<void> = subject.asObservable();

@Component({
  selector: 'app-table-setor',
  templateUrl: './table-setor.component.html',
  styleUrls: ['./table-setor.component.css'],
})
export class TableSetorComponent implements AfterViewInit {
  private _http: HttpClient;
  private _config: ConfigService;
  private _messager: MessageService;
  setoress=Setores;
  setorSelect: string;

  displayedColumns: string[] = ['id', 'nome', 'equipamentos', 'acoes'];
  dataSource: MatTableDataSource<Setor>;
  /*
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; */

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;



  constructor(
    http: HttpClient,
    config: ConfigService,
    messager: MessageService,
    private setorServices: SetorService,
    public dialog: MatDialog
  ) {
    this._config = config;
    this._http = http;
    this._messager = messager;
    /*
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  } */

    //this.getSetor();
    this.setorServices.getSetores().subscribe(res => {
      console.log(res);
      this.setoress = res;
      this.dataSource = new MatTableDataSource<Setor>(this.setoress);
      this.dataSource.paginator = this.paginator;
    })
    //this.getSetores();
  }
  openDialog(setor: Setor) {
    const dialogRef = this.dialog.open(DislogEditSetorComponent, {
      data: {
        _id: setor._id,
        Nome: setor.Nome,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Deu certo!");
      var setorModel: Setor = result;

      this.setorServices.updateSetor(setorModel._id, setorModel).subscribe(() => {
        console.log("Deu certo denovo cara!");
      })

      this.setorServices.getSetores().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.setoress = res;
        this.dataSource = new MatTableDataSource<Setor>(this.setoress);
        this.dataSource.paginator = this.paginator;
      })
    });
  }

  openDialogAdd(){
    const dialogRef = this.dialog.open(DislogEditSetorComponent, {
      data: {
        _id: '',
        Nome: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Incluiu!');
      var setorModel: Setor = result;

      setorModel._id = "";

      this.setorServices.adicionalSetor(setorModel).subscribe(() => {
        console.log('Incluiu de vdd!');
      })

      this.setorServices.getSetores().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.setoress = res;
        this.dataSource = new MatTableDataSource<Setor>(this.setoress);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  openDialogDelete(setor: Setor){
    const dialogRef = this.dialog.open(DialogDeleteSetorComponent, {
      data: {
        _id: setor._id,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('por enquanto, blz');
      var setorModal: Setor = result;

      this.setorServices.deleteSetor(setorModal._id).subscribe(() => {
        console.log('Excluiu!');
      })

      this.setorServices.getSetores().subscribe(res => {
        console.log(res);
        console.log("Deu get denovo!");
        this.setoress = res;
        this.dataSource = new MatTableDataSource<Setor>(this.setoress);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterSelect() {
    const filterValue  = this.setorSelect;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSetor() {
    this._http
      .get<ResultContent<Setor[]>>(this._config.getBaseUrl())
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource<Setor>(result.content);
        //proccess response
      }),
      (error) => {
        console.log(
          "Error while 'GET' request (view logs for more details)..."
        );
        this._messager.showError(
          'An error occurred in connection with server, verify internet connections.' +
            error
        );
      };
  }


  getSetores() {
    this.dataSource = new MatTableDataSource<Setor>(Setores);
    this.dataSource.paginator = this.paginator;
  }



}

/** Builds and returns a new User. */
/* function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
 */
