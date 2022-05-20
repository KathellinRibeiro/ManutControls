import { ConfigService } from './../../services/configService';
import { MessageService } from './../../services/messageService';
import { Usuario } from './../../models/usuario';
import { AfterViewInit, Component, ViewChild, OnInit, NgZone  } from '@angular/core';
import { RegisterService } from '../services/serviceRegister/register.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

const subject: Subject<void> = new Subject();
const observable: Observable<void> = subject.asObservable(); 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private _http: HttpClient;
  public usuario: Usuario;
  private _configService: ConfigService;
  private _messager:MessageService ;
  Roles: any = ['Admin', 'Auditor', 'Outros'];
  usuarioNome:String;
  usuarioEmail:String;
  usuarioCpf:String;
  usuarioCargo:String;
  usuarioDisponibilidade:String;
  usuarioData:String;
  usuarioSenha:String;

  ngOnInit() {
  }

  constructor(private registerService: RegisterService, http: HttpClient,private ngZone: NgZone,
    config: ConfigService, private router: Router,
    messager: MessageService,) {
    this.usuario = new Usuario();
    this._configService = config;
    this._messager = messager;
    this._http = http;

  }

  solicitar() {
    var usuarioModel: Usuario = new Usuario(
      this.usuarioNome,this.usuarioCpf,this.usuarioEmail,this.usuarioSenha,this.usuarioCargo,this.usuarioDisponibilidade,
      this.usuarioData
    )
    if (this.usuarioNome == "") {
      this._messager.showError("Nome não informado.");
      return;
    }
    if (this.usuarioCpf == null) {
      this._messager.showError("CPF não informado.");
      return;
    }
    this.usuarioNome = this.usuarioNome.trim();

    if (this.usuarioNome.length === 0) {
      this._messager.showError("Nome não informado.");
      return;
    }
  /*
    if (this.person.gender === Gender.Nothing) {
      this._messager.showError("Gender was not selected.");
      return;
    }
 */
    if(this.usuarioData==null){
      this._messager.showError("Data não informada.");
      return;
    }
    if(this.usuarioCpf==null){
      this._messager.showError("CPF não informado.");
      return;
    }
    if (this.usuarioEmail == null) {
      this._messager.showError("Email não informado.");
      return;
    }
    if(this.usuarioDisponibilidade == null){
      this._messager.showError("Disponibilidade não informada.");
      return;
    }
    if (this.usuarioCargo == null) {
      this._messager.showError("Matrícula não informado.");
      return;
    }

    if (this.usuarioSenha == null) {
      this._messager.showError("Senha não informada.");
      return;
    }
    this.registerService.registraUsuario(usuarioModel).subscribe((x) => {
      this.ngZone.run(() => this.router.navigateByUrl('/login') )
    })
  }
}
