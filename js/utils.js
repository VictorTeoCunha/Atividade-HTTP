// Função para fechar a lista de clientes cadastrados
export function fecharCadastros() {
    const btnFecharLista = document.getElementById('fechar');
    if (btnFecharLista) {
        form.removeChild(btnFecharLista); 
    }
    document.getElementById("listaClientes").innerHTML = '';
}