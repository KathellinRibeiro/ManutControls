import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Manutencoes } from 'src/models/Manutencoes';
import { EquipamentoService } from 'src/app/services/serviceEquipamento/equipamento.service';
import { Equipament } from 'src/models/equipamento';

var tipoManutencao: Manutencoes[] = [
  { Tipo: "Preventiva" },
  { Tipo: "Corretiva" },
  { Tipo: "Preditiva" },
]

var list: Equipament[] = [];

@Component({
  selector: 'app-manut-dialog',
  templateUrl: './manut-dialog.component.html',
  styleUrls: ['./manut-dialog.component.css']
})
export class ManutDialogComponent implements OnInit {

  tipomanutencoes=tipoManutencao;
  lists=list;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Manutencoes, 
  public dialogRef: MatDialogRef<ManutDialogComponent>,
  private equipamentoService: EquipamentoService) {

    this.equipamentoService.getEquipamentos().subscribe(res => {
      console.log(res);
      console.log("Deu get denovo!");
      this.lists = res;
    })

   }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
