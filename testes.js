function redirecionar(url) {
    return `Redirecionando para ${url}`;
  }

  function MostrarMensagemSucesso(mensagem) {
    const notification = document.querySelector('.notification');
    const notificationContainer = document.querySelector('.notification-container');
    
    if (mensagem) {
      notificationContainer.textContent = mensagem; // Define a mensagem
      notification.style.display = 'block'; // Exibe a notificação
      notificationContainer.style.display = 'block'; // Exibe o container da notificação
    } else {
      notification.style.display = 'none'; // Esconde a notificação
      notificationContainer.style.display = 'none'; // Esconde o container da notificação
    }
  }
  
  

function criarLogo() {
  const logo = document.createElement('img');
  logo.id = 'logo';
  logo.src = 'images/logo.png';
  logo.alt = 'Logo da Loja';
  logo.addEventListener('click', redirecionarParaHome);
  document.body.appendChild(logo);
  return logo;
}

function renderizarCarrinho(itens) {
  const carrinhoContainer = document.createElement('div');
  carrinhoContainer.id = 'carrinho';

  itens.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      carrinhoContainer.appendChild(itemDiv);
  });

  document.body.appendChild(carrinhoContainer);
}

function redirecionarParaLogin() {
  window.location.href = '/login'; // Redireciona para a página de login
}

function enviarFormulario(nome, email, senha) {
  if (nome && email && senha) {
      redirecionarParaLogin(); // Simula o redirecionamento após cadastro bem-sucedido
  }
}

function criarFormulario() {
  const formulario = document.createElement('form');
  formulario.id = 'formCadastro';

  const inputNome = document.createElement('input');
  inputNome.id = 'nome';
  inputNome.placeholder = 'Nome';
  formulario.appendChild(inputNome);

  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.placeholder = 'Email';
  formulario.appendChild(inputEmail);

  const inputSenha = document.createElement('input');
  inputSenha.id = 'senha';
  inputSenha.type = 'password';
  inputSenha.placeholder = 'Senha';
  formulario.appendChild(inputSenha);

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Cadastrar';
  formulario.appendChild(button);

  formulario.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      enviarFormulario(inputNome.value, inputEmail.value, inputSenha.value);
  });

  document.body.appendChild(formulario);
  return formulario;
}


function exibirMensagemErro(mensagem) {
  const mensagemErro = document.createElement('div');
  mensagemErro.id = 'mensagemErro';
  mensagemErro.textContent = mensagem;
  document.body.appendChild(mensagemErro);
}

function verificarCredenciais(email, senha) {
  const credenciaisCorretas = {
      email: 'usuario@exemplo.com',
      senha: 'senha123',
  };

  return email === credenciaisCorretas.email && senha === credenciaisCorretas.senha;
}

function enviarFormulario(email, senha) {
  if (verificarCredenciais(email, senha)) {
      redirecionarParaHome(); // Redireciona se as credenciais estiverem corretas
  } else {
      exibirMensagemErro('Credenciais inválidas. Tente novamente.');
  }
}

module.exports = {
    MostrarMensagemSucesso,
    redirecionar,
    criarLogo,
    renderizarCarrinho,
    criarFormulario,
    enviarFormulario,
    redirecionarParaLogin,
    verificarCredenciais,
    exibirMensagemErro,
  };