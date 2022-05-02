import { HttpStatusCode } from "@angular/common/http";
import { Status } from "./Status";
import { Criticidade } from "./Criticidade";

export class Equipament {
    public Id?: number;
    public Descricao?: string;
    public dataEntrada?: Date;
    public Tag?: string;
    public Status?: boolean;
    public Peca?: string;
    public Local?: string;
    public Criticidade?: Criticidade;
    public QRCode?: String;
    public TipoEquip?: String;
    public StatusDesc?: String;
    public Setor?: String;
    public CriticidadeDesc?: String;
}