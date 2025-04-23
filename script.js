// Variáveis para controle DOM
const inputEmail = document.getElementById("email");
const inputNome = document.getElementById("nome");  
const btnCadastrar = document.getElementById("add");
const btnExibir = document.getElementById("exibir");
const ListaClientes = document.getElementById("listaClientes");
const form = document.getElementById('form')

// Evento para abrir lista de clientes cadastrados
btnExibir.addEventListener('click', () => {
    if (!(document.getElementById('fechar'))){ // Não deixa criar outro botão
        const btnFecharLista = document.createElement('h3')
        btnFecharLista.innerHTML = `<br><button id="fechar" onclick="fecharCadastros()">X</button>`
        form.appendChild(btnFecharLista)
    }
    ListaClientes.innerHTML = ""; // Limpa lista antes de chamar de novo    
    // Exibir clientes cadastrados
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
            clienteCadastrado.innerHTML = `Nome: ${cliente.nome} <br> E-mail: ${cliente.email} <button onclick="deletar('${cliente.id}')">X</button>`
            //adiciona o Cliente na UL
            ListaClientes.appendChild(clienteCadastrado)
        });
    })
    .catch (error => console.error('A conexão falhou',error))
})

// Função para fechar a lista de clientes cadastrados
function fecharCadastros() {
    const btnFecharLista = document.getElementById('fechar');
    if (btnFecharLista) {
        form.removeChild(btnFecharLista); 
    }
    ListaClientes.innerHTML = '';
}

// Evento para cadastrar um cliente
btnCadastrar.addEventListener('click', () => {
    // Validações para não inputar faltando dados
    if (inputNome.value.length == 0 || inputEmail.value.length == 0){
        return alert('Preencha todos os campos para cadastrar')
    }
    // solicitação HTTP para realizar post
    fetch("https://cab5a225e11353492ac7.free.beeceptor.com/api/users/", {
        // Aplicar o método post
        method: 'post',
        headers: {'content-type': 'application/json'}, // Definindo o header
        //Transforma o objeto em JSON para enviar para API
        body: JSON.stringify({nome: inputNome.value, email: inputEmail.value})
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
        inputNome.value = '';
        inputEmail.value = '';
        ListaClientes.innerHTML= '';
        btnExibir.click()
    })
    .catch(error => {
        alert("Erro de conexão");
        console.error(error);
    })    
})

// função para excluir um cliente cadastrado
function deletar(id){
    console.log(`Tentando deletar o cliente com id: ${id}`);  // Log para depuração
    fetch(`https://cab5a225e11353492ac7.free.beeceptor.com/api/users/${id}`, {
        // Definindo metodo como delete
        method: 'DELETE'
    })
    .then(resposta => {
        if (resposta.ok){
            alert('Cliente excluído com sucesso!')
            ListaClientes.innerHTML=''
            btnExibir.click()
        } else {
            alert ('Erro ao remover', resposta.statusText)
        }
    })
}