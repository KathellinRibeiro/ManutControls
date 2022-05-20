import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estoque } from 'src/models/Estoque';
import { SetorService } from 'src/app/services/setor.service';

@Component({
  selector: 'app-estoque-dialog',
  templateUrl: './estoque-dialog.component.html',
  styleUrls: ['./estoque-dialog.component.css']
})
export class EstoqueDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Estoque, public dialogRef: MatDialogRef<EstoqueDialogComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
