/*CSS - TELA KANBAN - TELA 03*/

// DECLARAÇÃO DAS COLUNAS

const colunaAFazer = document.getElementById("colunaAFazer");
const colunaFazendo = document.getElementById("colunaFazendo");
const colunaFeito = document.getElementById("colunaFeito");

const btnRelatorio = document.getElementById("btnRelatorio");

// BUSCAR TAREFAS
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; //  Carrega as tarefas ou cria uma lista vazia

let cardArrastado = null; // Guarda na variável qual card foi mexido

// CRIAR OS CARDS
tarefas.forEach(item => { // Cria um card para cada tarefa salva

    const card = document.createElement("div");
    card.classList.add("card"); // Aplicação do estilo CSS no card da tarefa 
    card.draggable = true; // Permite arrastar com o mouse 

    // Abaixo, faz com que cada tarefa vire um cartão visual 
    card.innerHTML = ` 
        <strong>${item.tarefa}</strong><br>
        Prazo: ${item.prazo}<br>
        Prioridade: ${item.prioridade}
    `;

    card.dataset.tarefa = item.tarefa; // Identificador para saber qual tarefa foi movida no quadro Kanban

    card.addEventListener("dragstart", () => cardArrastado = card);
    card.addEventListener("dragend", () => cardArrastado = null);

    if (item.status === "fazer") colunaAFazer.appendChild(card);
    if (item.status === "fazendo") colunaFazendo.appendChild(card);
    if (item.status === "feito") colunaFeito.appendChild(card);
});


const listas = document.querySelectorAll(".lista");

listas.forEach(lista => {

    lista.addEventListener("dragover", e => e.preventDefault()); // Faz com que o navegador permita soltar o card

    lista.addEventListener("drop", () => {

        if (!cardArrastado) return;

        lista.appendChild(cardArrastado); // Solta o card dentro da coluna nova. Visualmente ele se move

        const nomeTarefa = cardArrastado.dataset.tarefa;

        tarefas.forEach(t => {

            if (t.tarefa === nomeTarefa) {

                if (lista.id === "colunaAFazer") t.status = "fazer";
                if (lista.id === "colunaFazendo") t.status = "fazendo";
                if (lista.id === "colunaFeito") t.status = "feito";

            }

        });

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

    });

});


// ABRIR TELA DE RELATÓRIO

btnRelatorio.addEventListener("click", () => {
    window.location.href = "telaRelatorio.html";
});
