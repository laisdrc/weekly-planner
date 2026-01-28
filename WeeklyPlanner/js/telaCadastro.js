// JAVASCRIPT - TELA CADASTRO - TELA 01

const btnCadastro = document.getElementById("btnCadastro"); // Reconhecimento do botão 

btnCadastro.addEventListener("click", function(){ // O que ocorrerá ao clicar no botão

    const email = document.getElementById("email").value; // .value é para pegar o conteúdo do campo de texto
    const senha = document.getElementById("senha").value;

    localStorage.setItem("email", email); // Salva no navegador a informação inserida pelo usuário 

    window.location.href = 'telaPlanejamento.html'; // Vai para a próxima tela após guardar as informações do user
});

