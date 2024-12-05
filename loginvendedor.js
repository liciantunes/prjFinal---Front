document.getElementById('VendedorForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const loginError = document.getElementById('loginError');

    try {
        // Envia a requisição POST para o backend
        const response = await fetch('http://localhost:8080/vendedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha }) // Dados do cliente (email e senha)
        });

        if (response.ok) {
            // Redireciona para a página principal após login bem-sucedido
            window.location.href = 'vendedor.html'; 
        } else {
            // Exibe a mensagem de erro retornada do backend
            const errorMessage = await response.text();
            loginError.innerText = errorMessage;
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro:', error);
        loginError.innerText = 'Erro de conexão. Tente novamente.';
        loginError.style.display = 'block';
    }
});
