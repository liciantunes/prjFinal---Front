document.addEventListener('DOMContentLoaded', function () {
    // Selecionando todos os botões de "Carrinho"
    const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');
  
    // Iterando sobre todos os botões
    botoesAdicionarCarrinho.forEach(button => {
      button.addEventListener('click', function () {
        // Pegue o elemento pai (produto)
        const produto = button.closest('.single-product');
  
        // Pegue o nome do produto (do título)
        const nomeProduto = produto.querySelector('.product-content h3 a').textContent;
  
        // Pegue o preço do produto
        const precoProduto = produto.querySelector('.product-price span').textContent;
  
        // Mostra o alerta com o nome do produto e preço
        alert(`Produto "${nomeProduto}" adicionado ao carrinho por ${precoProduto}!`);
  
        // Adiciona o produto ao carrinho
        adicionarAoCarrinho(nomeProduto, precoProduto);
      });
    });
  
    // Função para adicionar ao carrinho (armazenando no localStorage como exemplo)
    function adicionarAoCarrinho(nome, preco) {
      // Obtém o carrinho atual (se existir) ou cria um carrinho vazio
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
      // Adiciona o produto ao carrinho
      carrinho.push({ nome, preco });
  
      // Salva o carrinho atualizado no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
  });