
export class Usuario {
  Nome: string;
  CPF: String;
  Email: string;
  Senha: string;
  Cargo: string;
  Disponibilidade: String;
  Data: Date;

  constructor( Nome?,Cpf?, Email?, Senha?,Cargo?,Disponibilidade?,Data?){
    this.Nome = Nome || "";
    this.CPF = Cpf || "";
    this.Email = Email|| "";
    this.Senha = Senha || "";
    this.Cargo = Cargo || "";
    this.Disponibilidade= Disponibilidade || "";
    this.Data = Data || "";
  }
  getNome(){
    return this.Nome;
  }
  getCPF(){
    return this.CPF;
  }
  getEmail(){
    return this.Email;
  }
  getSenha() {
    return this.Senha;
  }
  getCargo(){
    return this.Cargo;
  }
  getDisponibilidade(){
    return this.Disponibilidade;
  }
  getData(){
    return this.Data;
  }
  setNome(Nome){
    this.Nome = Nome;
  }
  setCPF(CPF){
    this.CPF = CPF;
  }
  setEmail(Email) {
    this.Email = Email;
  }
  setSenha(Senha) {
    this.Senha = Senha;
  }
  setCargo(Cargo) {
    this.Cargo = Cargo;
  }
  setDisponibilidade(Disponibilidade){
    this.Disponibilidade = Disponibilidade;
  }
  setData(Data){
    this.Data=Data;
  }
}
