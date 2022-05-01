import { DislogEditSetorComponent } from './dislog-edit-setor/dislog-edit-setor.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-setor',
  templateUrl: './dialog-setor.component.html',
  styleUrls: ['./dialog-setor.component.css']
})
export class DialogSetorComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DislogEditSetorComponent);}

  ngOnInit(): void {
  }

}
