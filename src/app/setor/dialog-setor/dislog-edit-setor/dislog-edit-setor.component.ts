import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Setor } from 'src/models/setor';
import { SetorService } from 'src/app/services/setor.service';

@Component({
  selector: 'app-dislog-edit-setor',
  templateUrl: './dislog-edit-setor.component.html',
  styleUrls: ['./dislog-edit-setor.component.css']
})
export class DislogEditSetorComponent implements OnInit {
value: string;
setorModel: Setor;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Setor, public dialogRef: MatDialogRef<DislogEditSetorComponent>,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  

}
