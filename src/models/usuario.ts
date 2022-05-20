
export class Usuario {
  nome: string;
  CPF: String;
  email: string;
  senha: string;
  cargo: string;
  disponibilidade: String;
  data: Date;

  constructor( Nome?,Cpf?, Email?, Senha?,Cargo?,Disponibilidade?,Data?){
    this.nome = Nome || "";
    this.CPF = Cpf || "";
    this.email = Email|| "";
    this.senha = Senha || "";
    this.cargo = Cargo || "";
    this.disponibilidade= Disponibilidade || "";
    this.data = Data || "";
  }
  getNome(){
    return this.nome;
  }
  getCPF(){
    return this.CPF;
  }
  getEmail(){
    return this.email;
  }
  getSenha() {
    return this.senha;
  }
  getCargo(){
    return this.cargo;
  }
  getDisponibilidade(){
    return this.disponibilidade;
  }
  getData(){
    return this.data;
  }
  setNome(nome){
    this.nome = nome;
  }
  setCPF(CPF){
    this.CPF = CPF;
  }
  setEmail(email) {
    this.email = email;
  }
  setSenha(senha) {
    this.senha = senha;
  }
  setCargo(cargo) {
    this.cargo = cargo;
  }
  setDisponibilidade(disponibilidade){
    this.disponibilidade = disponibilidade;
  }
  setData(data){
    this.data=data;
  }
}
