// JAVASCRIPT - TELA PLANEJAMENTO - TELA 02

const btnRegistrar = document.getElementById("btnRegistrar");
const btnSalvar = document.getElementById("btnSalvar");
const btnKanban = document.getElementById("btnKanban")

const inputTarefa = document.getElementById("tarefa");
const inputPrazo = document.getElementById("prazo");
const listaDiv = document.getElementById("lista"); 

const tituloExibido = document.getElementById("tituloExibido");
const tituloProjeto = document.getElementById("tituloProjeto");
const container = document.querySelector(".container");
const inicioProjeto = document.getElementById("inicioProjeto");

btnSalvar.addEventListener("click", function() {

        tituloExibido.textContent = tituloProjeto.value; // EXIBIÇÃO DO TÍTULO NO LABEL
        inicioProjeto.style.display = "none";
        container.style.display = "block";
    
        if (container.style.display === 'none' || container.style.display === '') { // EXIBIÇÃO DO FORMS
            container.style.display = 'block'; 
          }
    
          document.getElementById('tituloProjeto').value = ''; // LIMPAR CAMPO DE TEXTO
    
        });
    

let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || []; // Faz com que a lista não seja apagada ao recarregar a tela
// JSON.parse -> Transforma texto salvo em array JS
// || [] -> Se tiver uma lista, utilize ela. Caso contrário, lista vazia. 

btnRegistrar.addEventListener("click", function(){

    const tarefa = inputTarefa.value;
    const prazo = inputPrazo.value;
    const prioridade = document.querySelector('input[name="prioridade"]:checked').value;

    if (tarefa === "" || prazo === "") {
        alert("Preencha a tarefa e o prazo!");
        return;
    }

    const novaTarefa = {
        tarefa: tarefa,
        prazo: prazo,
        prioridade: prioridade,
        status: "fazer" // Todas as tarefas irão começar 'à fazer'
    };

    listaTarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas)); // Transforma array em texto e salva no navegador
    // localStorage somente aceita texto

    inputTarefa.value = "";
    inputPrazo.value = "";

    atualizarLista();

});

function atualizarLista() {

    listaDiv.innerHTML = ""; // Evita duplicar tarefas 

    listaTarefas.forEach(function(item) {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${item.tarefa}</strong><br>
            Prazo: ${item.prazo}<br>
            Prioridade: ${item.prioridade}
            <hr>
        `;
        listaDiv.appendChild(div);
    });
}

    // -------------------------------------


btnKanban.addEventListener("click", function(){

    localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    window.location.href = 'telaKanban.html'; // REDIRECIONAMENTO PARA TELA 03
    
});

document.getElementById("novoPlanner").addEventListener("click", () => {

    localStorage.removeItem("tarefas"); // Apaga tudo do navegador 
    listaTarefas = [];                  // limpa o array da tela

    atualizarLista();                  // atualiza visualmente

});


