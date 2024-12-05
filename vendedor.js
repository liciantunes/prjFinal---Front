let produtoId = null; // Variável para armazenar o ID do produto que estamos editando

function cadastrarProduto() {
    const produtoNome = document.getElementById('produtoNome').value;
    const produtoPreco = document.getElementById('produtoPreco').value;
    const produtoEstoque = document.getElementById('produtoEstoque').value;
    const imagemFile = document.getElementById('thumbnail').files[0];

    const formData = new FormData();
    formData.append('produtoNome', produtoNome);
    formData.append('produtoPreco', produtoPreco);
    formData.append('produtoEstoque', produtoEstoque);
    formData.append('thumbnail', imagemFile);

    fetch('http://localhost:8080/produtos/create', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto cadastrado com sucesso!');
        location.reload(); // Recarrega a página
    })
    .catch(error => {
        console.error('Erro ao cadastrar produto:', error);
    });
}

function atualizarProduto() {
    // Coleta os dados do formulário
    const produtoId = document.getElementById('produtoIdAtualizar').value;
    const produtoNome = document.getElementById('produtoNome').value;
    const produtoPreco = document.getElementById('produtoPreco').value;
    const produtoEstoque = document.getElementById('produtoEstoque').value;
    const imagemFile = document.getElementById('thumbnail').files[0];

    // Verifica se o ID foi fornecido
    if (!produtoId) {
        alert('Digite o ID do produto para atualizar');
        return;
    }

    // Cria um objeto FormData para enviar os dados
    const formData = new FormData();
    formData.append('produtoNome', produtoNome);
    formData.append('produtoPreco', produtoPreco);
    formData.append('produtoEstoque', produtoEstoque);
    if (imagemFile) {
        formData.append('thumbnail', imagemFile); // Adiciona a imagem se selecionada
    }

    // Envia a requisição PUT para atualizar o produto
    fetch(`http://localhost:8080/produtos/update/${produtoId}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto atualizado com sucesso!');
        location.reload(); // Recarrega a página após atualização
    })
    .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar o produto. Tente novamente.');
    });
}


function deletarProduto() {
    const produtoIdExcluir = document.getElementById('produtoIdExcluir').value; // Pegando o ID digitado pelo usuário

    if (!produtoIdExcluir) {
        alert('Por favor, insira o ID do produto para excluir.');
        return;
    }

    fetch(`http://localhost:8080/produtos/delete/${produtoIdExcluir}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 204) {
            alert('Produto deletado com sucesso!');
            location.reload(); // Recarrega a página
        } else {
            alert('Produto não encontrado ou erro ao excluir');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar produto:', error);
    });
}