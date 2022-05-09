import { HttpStatusCode } from "@angular/common/http";
import { Status } from "./Status";
import { Criticidade } from "./Criticidade";
import { Estoque } from "./Estoque";
import { QRCode } from "./QRCode";

export class Equipament {
    public _id?: number;
    public Descricao?: string;
    public dataEntrada?: Date;
    public Tag?: string;
    public Status?: Status;
    public Peca?: Estoque;
    public Local?: string;
    public Criticidade?: Criticidade;
    public QRCode?: QRCode;
    /* public TipoEquip?: String;
    public StatusDesc?: String;
    public Setor?: String;
    public CriticidadeDesc?: String; */
}