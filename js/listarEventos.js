import { db } from "./firebaseConfig.js"
import { getDoc, getDocs, collection, doc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


async function buscarEventos() {
    const dadosBanco = await getDocs(collection(db, "eventos"))
    const eventos = [ ]
    for (const doc of dadosBanco.docs){
        eventos.push({id: doc.id, ...doc.data()})
    }
    return eventos;
}

const listaEventosDiv = document.getElementById("listar-eventos");

async function carregarListaDeEventos() {
    listaEventosDiv.innerHTML = '<p> Carregando Lista de Eventos ... </p>'
    try{
        const eventos = await buscarEventos()
        console.log(eventos)
        renderizarListaDeEventos(eventos)
    }catch (error) {
        console.log("Erro ao carregar a lista de Eventos: ", error);
        listaEventosDiv.innerHTML = '<p> Erro ao Carregar a lista de Eventos </p>'
    }
}

function renderizarListaDeEventos(eventos){
    listaEventosDiv.innerHTML = ""

    if(eventos.length === 0){
        listaEventosDiv.innerHTML = '<p> Nenhum evento cadastrado ainda ;( </p>'
        return
    }

        for (let evento of eventos){
            const eventoDiv = document.createElement("div");
            eventoDiv.classList.add('evento-item');
            eventoDiv.innerHTML = `
                <img src='${evento.imagemCapa || "https://via.placeholder.com/220x220?text=Sem+Imagem"}' alt='Imagem de capa'>
                <div class="evento-item-content">
                    <span class="evento-nome">${evento.nome}</span>
                    <div><strong>Data de Início:</strong> ${evento.dataInicio}</div>
                    <div><strong>Data de Fim:</strong> ${evento.dataFim}</div>
                    <div><strong>Descrição:</strong> ${evento.descricao}</div>
                    <div class="evento-item-botoes">
                        <button class="btn-Excluir" data-id="${evento.id}">Excluir</button>
                        <button class="btn-Editar" data-id="${evento.id}">Editar</button>
                    </div>
                </div>
            `;
            listaEventosDiv.appendChild(eventoDiv)
        }
    addEventListener();
}

async function excluirEvento(idEvento) {
    try{
        const documentoDeletar = doc(db, "eventos", idEvento);
        await deleteDoc(documentoDeletar)
        console.log("Evento com ID" + idEvento + "foi excluído.")
        return true;
    }catch (erro){
        console.log("Erro ao excluir o evento", erro)
        alert("Ocorreu um erro ao excluir o evento. Tente novamente!")
        return false;
    }
}

let edicao = null; // Definindo variável global


async function lidarClique(eventoDeClique) {
    const btnExcluir = eventoDeClique.target.closest('.btn-Excluir')
    if(btnExcluir){
        const certeza = confirm("Tem certeza que deseja fazer essa exclusão?")
        if(certeza){
            
            const idEvento = btnExcluir.dataset.id;
            const exclusaoBemSucedida = await excluirEvento(idEvento)

            if(exclusaoBemSucedida) {
                carregarListaDeEventos();
                alert("Evento excluído com sucesso! ")
            } 
        } else {
                alert("Exclusão cancelada")
        }
    }

    const btnEditar = eventoDeClique.target.closest('.btn-Editar')
    if (btnEditar){
        const idEvento = btnEditar.dataset.id
        const evento = await buscarEventosPorId(idEvento)

        edicao = getValoresEditar()

        edicao.editarNome.value = evento.nome
        edicao.editarDataInicio.value = evento.dataInicio
        edicao.editarDataFim.value = evento.dataFim
        edicao.editarDescricao.value = evento.descricao
        edicao.editarId.value = evento.id

        edicao.formularioEdicao.style.display = 'block'
    }
}

function getValoresEditar() {
    return {
        editarNome: document.getElementById("editar-nome"),
        editarDataInicio: document.getElementById("editar-dataInicio"),
        editarDataFim: document.getElementById("editar-dataFim"),
        editarDescricao: document.getElementById("descricao"),
        editarId: document.getElementById("editar-id"),
        formularioEdicao: document.getElementById("formulario-edicao")

    }
}

async function buscarEventosPorId(id) {
    try{
        const eventoDoc = doc(db, "eventos", id)
        const dadoAtual = await getDoc(eventoDoc)

        if (dadoAtual.exists()){
            return {id: dadoAtual.id, ...dadoAtual.data()}
        }else {
            console.log("Evento não encontrado com o ID", id);
            return null;
        }
    } catch (erro){
        console.log("Erro ao buscar o evento por ID ", erro)
        alert("Erro ao buscar evento para editar")
        return null
    }
}

document.getElementById("btnSalvarEdicao").addEventListener("click", async () => {
    const id = edicao.editarId.value;
    const novoDados={
        nome: edicao.editarNome.value.trim(),
        dataInicio: edicao.editarDataInicio.value.trim(),
        dataFim: edicao.editarDataFim.value.trim(),
        descricao: edicao.editarDescricao.value.trim()
    }

    try{
        const ref = doc(db, "eventos", id)
        await setDoc(ref, novoDados)
        alert("Evento atualizado com sucesso!")
        edicao.formularioEdicao.style.display = 'none'
        carregarListaDeEventos();
    } catch (error){
        console.log("Erro ao salvar edicão", error);
        alert("Erro ao atualizar evento.")
    }
})

document.getElementById('btnCancelarEdicao').addEventListener('click', () => {
    document.getElementById("formulario-edicao").style.display = 'none'
})

function addEventListener(){
    listaEventosDiv.addEventListener("click", lidarClique)
}

document.addEventListener("DOMContentLoaded", carregarListaDeEventos)