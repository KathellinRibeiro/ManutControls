import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipament } from 'src/models/equipamento';
import { SetorService } from 'src/app/services/setor.service';
import { Setor } from 'src/models/setor';

var statusMaq: Equipament[] = [
  { StatusDesc: "Ativo", Status: "Ativo" },
  { StatusDesc: "Inativo", Status: "Inativo" },
];

var Criticidade: Equipament[] =
[
  { Criticidade: "Baixa" },
  { Criticidade: "Média" },
  { Criticidade: "Alta" },
]

var Setores: Setor[] = [];

@Component({
  selector: 'app-equip-dialog',
  templateUrl: './equip-dialog.component.html',
  styleUrls: ['./equip-dialog.component.css']
})
export class EquipDialogComponent implements OnInit {

  setoress=Setores;
  crits=Criticidade;

  statusMaqs=statusMaq;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Equipament,
   public dialogRef: MatDialogRef<EquipDialogComponent>,
   private setorServices: SetorService,) {
    this.setorServices.getSetores().subscribe(res => {
      console.log(res);
      this.setoress = res;
    })
   }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
