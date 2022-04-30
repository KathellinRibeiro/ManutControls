import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../services/configService';
import { MessageService } from './../../services/messageService';
import { Indicadores } from './../../models/indicadores';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public indicadores: Indicadores;
  private _configService: ConfigService;
  private _messager:MessageService ;

  menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];


  ngOnInit(): void {
  }

  constructor(configService: ConfigService, messager: MessageService) {
    this.indicadores = new Indicadores();
    this._configService = configService;
    this._messager = messager;

  }


}
