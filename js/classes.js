export class CadastrarCliente {
    constructor() {
        this.ListaClientes = document.getElementById("listaClientes");
    }
    
    //método para exibir o cliente
    exibirClientesCadastrados() {
        fetch("https://cab5a225e11353492ac7.free.beeceptor.com/api/users/")
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            }else {
                throw new Error("Erro ao buscar os dados");
            }
        })
        .then(ListaApi => {
            ListaApi.forEach(cliente => {
                // Cria o elemento com os clientes na API
                const clienteCadastrado = document.createElement('li'); // Cria um elemento de lista
                // Cria a linha com o conteúdo
                clienteCadastrado.innerHTML = `Nome: ${cliente.nome} <br> E-mail: ${cliente.email}`
                
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = 'X';
        
                btnDeletar.addEventListener('click', () => {
                    this.deletar(cliente.id);
                });
                
                // Adiciona o botão de excluir à lista
                clienteCadastrado.appendChild(btnDeletar);
                //adiciona o Cliente na UL
                this.ListaClientes.appendChild(clienteCadastrado)
            });
        })
        .catch (error => console.error('A conexão falhou',error))
    }
    //método para cadastrar o cliente
    cadastrarCliente(nome, email) {
        // solicitação HTTP para realizar post
        fetch("https://cab5a225e11353492ac7.free.beeceptor.com/api/users/", {
            // Aplicar o método post
            method: 'post',
            headers: {'content-type': 'application/json'}, // Definindo o header
            //Transforma o objeto em JSON para enviar para API
            body: JSON.stringify({ nome: nome, email: email})
        })
        .then (resposta => {
            if (resposta.ok){
            return resposta.json();
            }else {
                throw new Error ('Erro ao trocar informações')
            };
        })
        .then (() => {
            alert('Cliente cadastrado com sucesso!');
            nome = '';
            email = '';
            this.ListaClientes.innerHTML= '';
            document.getElementById("exibir").click()
        })
        .catch(error => {
            alert("Erro de conexão");
            console.error(error);
        })    
    }
    deletar(id){
        console.log(`Tentando deletar o cliente com id: ${id}`);  // Log para depuração
        fetch(`https://cab5a225e11353492ac7.free.beeceptor.com/api/users/${id}`, {
            // Definindo metodo como delete
            method: 'DELETE'
        })
        .then(resposta => {
            if (resposta.ok){
                alert('Cliente excluído com sucesso!')
                document.getElementById("listaClientes").innerHTML=''
                document.getElementById("exibir").click()
            } else {
                alert ('Erro ao remover', resposta.statusText)
            }
        })
    }
}