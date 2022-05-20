export class Login {
    Email;
    Senha;
    token;

    constructor(email?, senha?){
        this.Email = email || "";
        this.Senha = senha || "";
        
    }

    getSenha() {
        return this.Senha;
    }

    getEmail() {
        return this.Email;
    }

    setEmail(Email) {
        this.Email = Email;
    }

    setSenha(Senha) {
        this.Senha = Senha;
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }
}

