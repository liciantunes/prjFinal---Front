function alternarAba(abaId) {
	// Esconde todas as abas
	document.getElementById('tecla').classList.remove('active');
	document.getElementById('cordas').classList.remove('active');

	// Mostra a aba selecionada
	document.getElementById(abaId).classList.add('active');

	// Rola para a seção onde as abas estão
	document.getElementById('productss').scrollIntoView({ behavior: 'smooth' });

	// Simula o clique no botão da aba correspondente
	if (abaId === 'tecla') {
		document.getElementById('btn1').click();
	} else if (abaId === 'cordas') {
		document.getElementById('btn2').click();
	}
}
