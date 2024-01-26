const tarefas = document.querySelector('.tarefas');
const inputTarefas = document.querySelector('.input-tarefas');
const btnAddTarefas = document.querySelector('.btn-add-tarefa');

document.addEventListener('click', function(event) {
    const el = event.target;

    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function criarLista() {
    const li = document.createElement('li');
    return li;
}

function criarTarefa(tarefaInput) {
    const lista = criarLista();
    lista.innerHTML = tarefaInput;
    tarefas.appendChild(lista);

    limpaInput();

    botaoApagar(lista);

    salvarTarefas();
}

function limpaInput() {
    inputTarefas.value = '';
    inputTarefas.focus();
}

function botaoApagar(lista) {
    lista.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    lista.appendChild(btnApagar);
}

function salvarTarefas() {
    const arrayTarefas = [];
    const listaTarefas = tarefas.querySelectorAll('li'); 
    
    for(let tarefa of listaTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        arrayTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas() {
    const tarefasLocal = localStorage.getItem('tarefas');

    const listaTarefas = JSON.parse(tarefasLocal);

    for(let tarefa of listaTarefas) {
        criarTarefa(tarefa);
    }
}

inputTarefas.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        if (!inputTarefas.value) return;
        criarTarefa(inputTarefas.value);
    }
});

btnAddTarefas.addEventListener('click', function() {
    if (!inputTarefas.value) return;
    criarTarefa(inputTarefas.value);
});

addTarefasSalvas();