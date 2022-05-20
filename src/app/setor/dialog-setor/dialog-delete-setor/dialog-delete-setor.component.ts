import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Setor } from 'src/models/setor';

@Component({
  selector: 'app-dialog-delete-setor',
  templateUrl: './dialog-delete-setor.component.html',
  styleUrls: ['./dialog-delete-setor.component.css']
})
export class DialogDeleteSetorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Setor, public dialogRef: MatDialogRef<DialogDeleteSetorComponent>,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
