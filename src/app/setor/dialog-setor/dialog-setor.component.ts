<<<<<<< HEAD
import { DislogEditSetorComponent } from './dislog-edit-setor/dislog-edit-setor.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
=======
import { Component, OnInit } from '@angular/core';
import { DislogEditSetorComponent } from './dislog-edit-setor/dislog-edit-setor.component';
import { MatDialog } from '@angular/material/dialog';

>>>>>>> branchVini
@Component({
  selector: 'app-dialog-setor',
  templateUrl: './dialog-setor.component.html',
  styleUrls: ['./dialog-setor.component.css']
})
export class DialogSetorComponent implements OnInit {

<<<<<<< HEAD
  constructor(public dialog: MatDialog) {}
=======
  constructor(public dialog: MatDialog) { }
>>>>>>> branchVini

  openDialog() {
    this.dialog.open(DislogEditSetorComponent);}

  ngOnInit(): void {
  }

}
