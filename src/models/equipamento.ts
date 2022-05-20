import { HttpStatusCode } from "@angular/common/http";
import { Status } from "./Status";
import { Criticidade } from "./Criticidade";
import { Estoque } from "./Estoque";
import { QRCode } from "./QRCode";

export class Equipament {
    public _id?: string;
    public Descricao?: string;
    public dataEntrada?: Date;
    public Tag?: string;
    public Status?: string;
    public Peca?: string;
    public Local?: string;
    public Criticidade?: string;
    public QRCode?: string;
    public StatusDesc?: String;
    /* public TipoEquip?: String;
    public StatusDesc?: String;
    public Setor?: String;
    public CriticidadeDesc?: String; */
}