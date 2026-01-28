// TELA RELATÓRIO - TELA 04

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; // Pega tudo que há salvo em sistema

// Abaixo, código para contador Total e por Status
let total = tarefas.length;
let feitas = 0;
let fazendo = 0;
let fazer = 0;

tarefas.forEach(t => {
    if (t.status === "feito") feitas++;
    if (t.status === "fazendo") fazendo++;
    if (t.status === "fazer") fazer++;
});

// Escreve os números (contador) nos seus respectivos cards
document.getElementById("totalTarefas").textContent = total;
document.getElementById("tarefasFeitas").textContent = feitas;
document.getElementById("tarefasFazendo").textContent = fazendo;
document.getElementById("tarefasAFazer").textContent = fazer;

let percentual = total === 0 ? 0 : Math.round((feitas / total) * 100); // Cálculo para porcentagem 
// Se não tiver tarefa: 0% ; Caso tenha, calcula a porcentagem e arredonda o valor final 

document.getElementById("aproveitamento").textContent = //Exibição da porcentagem
`Aproveitamento da semana: ${percentual}%`;


// GERAR PDF

const botaoPDF = document.getElementById("baixarPDF");

botaoPDF.addEventListener("click", () => { // Evento que irá ocorrer ao clicar no botão

    const area = document.querySelector("#relatorio");

    html2canvas(area).then(canvas => { // Tira foto da área do relatório

        const imgData = canvas.toDataURL("image/png"); // Converte em imagem

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4"); // Cria o PDF

        const largura = 210;
        const altura = (canvas.height * largura) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, largura, altura); // Insere a imagem para baixar o arquivo com o comando abaixo
        pdf.save("relatorio-semanal.pdf");

    });

});
