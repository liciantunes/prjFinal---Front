const {
    MostrarMensagemSucesso,
    redirecionar,
    criarLogo,
    renderizarCarrinho,
    criarFormulario,
    enviarFormulario,
    redirecionarParaLogin,
    verificarCredenciais,
    exibirMensagemErro,
} = require('./testes');

test('deve mostrar mensagem de sucesso corretamente', () => {
  expect(MostrarMensagemSucesso('Cadastro realizado')).toBe('Sucesso: Cadastro realizado');
});

test('deve redirecionar para a URL correta', () => {
  expect(redirecionar('/home')).toBe('Redirecionando para /home');
});

describe('Teste de Redirecionamento', () => {
  beforeEach(() => {
      // Configura o ambiente de teste com jsdom
      document.body.innerHTML = '';
      window.location.href = '/'; // Resetando o local antes de cada teste
  });

  test('deve redirecionar para a página inicial ao clicar no logo', () => {
      const logo = criarLogo();
      expect(window.location.href).toBe('http://localhost/'); // Verificando URL inicial

      logo.click(); // Simulando o clique no logo
      
      // Verifica se redirecionou corretamente
      expect(window.location.href).toBe('http://localhost/home');
  });
});

describe('Teste de Renderização do Carrinho', () => {
  beforeEach(() => {
      document.body.innerHTML = ''; // Limpa o DOM antes de cada teste
  });

  test('deve renderizar itens no carrinho corretamente', () => {
      const itens = [
          { nome: 'Produto 1', preco: 29.99 },
          { nome: 'Produto 2', preco: 49.99 },
      ];

      renderizarCarrinho(itens);

      const carrinho = document.getElementById('carrinho');
      expect(carrinho).toBeInTheDocument();
      expect(carrinho.children.length).toBe(2); // Verifica se 2 itens foram renderizados

      const produtos = [...carrinho.children].map(item => item.textContent);
      expect(produtos).toEqual([
          'Produto 1 - R$ 29.99',
          'Produto 2 - R$ 49.99',
      ]);
  });

  test('deve renderizar carrinho vazio corretamente', () => {
      renderizarCarrinho([]);

      const carrinho = document.getElementById('carrinho');
      expect(carrinho).toBeInTheDocument();
      expect(carrinho.children.length).toBe(0); // Verifica se nenhum item foi renderizado
  });
});

describe('Teste de Cadastro com Sucesso', () => {
    beforeEach(() => {
        document.body.innerHTML = ''; // Limpa o DOM antes de cada teste
        window.location.href = '/'; // Resetando a URL antes de cada teste
    });

    test('deve redirecionar para a página de login ao enviar o formulário com sucesso', () => {
        criarFormulario();

        // Preenche os campos do formulário
        document.getElementById('nome').value = 'Teste';
        document.getElementById('email').value = 'teste@exemplo.com';
        document.getElementById('senha').value = 'senha123';

        enviarFormulario();
        // Simula o envio do formulário
        const formulario = document.getElementById('formCadastro');
        formulario.dispatchEvent(new Event('submit'));

        // Verifica se redirecionou corretamente
        expect(redirecionarParaLogin(window.location.href).toBe('http://localhost/login'));
    });

    test('não deve redirecionar se os campos estiverem vazios', () => {
        criarFormulario();

        // Simula o envio do formulário sem preencher os campos
        const formulario = document.getElementById('formCadastro');
        formulario.dispatchEvent(new Event('submit'));

        // Verifica que não houve redirecionamento
        expect(window.location.href).toBe('http://localhost/');
    });
});


describe('Teste de Login', () => {
  beforeEach(() => {
      document.body.innerHTML = ''; // Limpa o DOM antes de cada teste
      window.location.href = '/'; // Resetando a URL antes de cada teste
  });

  test('deve redirecionar para a página inicial com credenciais válidas', () => {
      criarFormulario();
      verificarCredenciais();

      // Preenche os campos do formulário com credenciais válidas
      document.getElementById('email').value = 'usuario@exemplo.com';
      document.getElementById('senha').value = 'senha123';

      // Simula o envio do formulário
      const formulario = document.getElementById('formLogin');
      formulario.dispatchEvent(new Event('submit'));

      // Verifica se redirecionou corretamente
      expect(window.location.href).toBe('http://localhost/home');
  });

  test('deve exibir mensagem de erro com credenciais inválidas', () => {
      criarFormulario();

      // Preenche os campos do formulário com credenciais inválidas
      document.getElementById('email').value = 'usuario@exemplo.com';
      document.getElementById('senha').value = 'senhaErrada';

      // Simula o envio do formulário
      const formulario = document.getElementById('formLogin');
      formulario.dispatchEvent(new Event('submit'));


      exibirMensagemErro();
      // Verifica se a mensagem de erro foi exibida
      const mensagemErro = document.getElementById('mensagemErro');
      expect(mensagemErro).toBeInTheDocument();
      expect(mensagemErro.textContent).toBe('Credenciais inválidas. Tente novamente.');
  });
});
