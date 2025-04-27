// Modulos
import { fecharCadastros } from "./utils.js";
import { CadastrarCliente } from "./classes.js";

// Manipulação do DOM
const btnCadastrar = document.getElementById("add");
const btnExibir = document.getElementById("exibir");
const ListaClientes = document.getElementById("listaClientes");
const form = document.getElementById('form')

//Obejeto da classe CadastrarCliente
const cadastrarCliente = new CadastrarCliente ();

// Evento para abrir lista de clientes cadastrados
btnExibir.addEventListener('click', () => {
    if (!(document.getElementById('fechar'))){ // Não deixa criar outro botão
        const btnFecharLista = document.createElement('h3')
        btnFecharLista.innerHTML = `<br><button id="fechar" onclick="fecharCadastros()">X</button>`
        form.appendChild(btnFecharLista)
    }
    ListaClientes.innerHTML = ""; // Limpa lista antes de chamar de novo   
    cadastrarCliente.exibirClientesCadastrados(); // Chama o método para exibir os clientes cadastrados 
   
})

// Evento para cadastrar um cliente
btnCadastrar.addEventListener('click', () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    // Validações para não inputar faltando dados
    if (nome.length == 0 || email.length == 0){
        return alert('Preencha todos os campos para cadastrar')
    }
    cadastrarCliente.cadastrarCliente(nome,email); // Chama o método para cadastrar o cliente
})

