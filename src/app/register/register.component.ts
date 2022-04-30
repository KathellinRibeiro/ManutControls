import { ConfigService } from './../../services/configService';
import { MessageService } from './../../services/messageService';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuario: Usuario;
  private _configService: ConfigService;
  private _messager:MessageService ;
  Roles: any = ['Admin', 'Auditor', 'Outros'];

  ngOnInit() {
  }


  constructor(configService: ConfigService, messager: MessageService) {
    this.usuario = new Usuario();
    this._configService = configService;
    this._messager = messager;

  }

  solicitar() {
    if (this.usuario.nome == null) {
      this._messager.showError("Nome não informado.");
      return;
    }

    this.usuario.nome = this.usuario.nome.trim();

    if (this.usuario.nome.length === 0) {
      this._messager.showError("Nome não informado.");
      return;
    }
/*
    if (this.person.gender === Gender.Nothing) {
      this._messager.showError("Gender was not selected.");
      return;
    }
 */


    if (this.usuario.email == null) {
      this._messager.showError("Email não informado.");
      return;
    }

    if (this.usuario.matricula == null) {
      this._messager.showError("Matrícula não informado.");
      return;
    }

    if (this.usuario.senha == null) {
      this._messager.showError("Senha não informada.");
      return;
    }
  }

}
