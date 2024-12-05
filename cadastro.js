function cadastrarUsuario() {
    let nome = document.getElementById('cadastroNome').value;
    let email = document.getElementById('cadastroEmail').value;
    let senha = document.getElementById('cadastroSenha').value;

    const requestBody = {
        nome,
        email,
        senha
    };

    fetch('http://localhost:8080/cliente/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(() => {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
             location.reload();
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
        });
    }

