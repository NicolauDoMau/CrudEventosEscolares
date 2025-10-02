import { db } from "./firebaseConfig.js"
import { getDocs, collection, doc, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"



document.getElementById("tituloCadastrar").innerHTML = "Cadastro de Eventos"


    function getInput(){
        return{
            dataFim: document.getElementById("dataFim"),
            dataInicio: document.getElementById("dataInicio"),
            nome: document.getElementById("nome"),
            descricao: document.getElementById("descricao"),
            imagemCapa: document.getElementById("imagemCapa")
        }
    }

    function getValores({dataFim, dataInicio, nome, descricao, imagemCapa}){
        return {
            dataFim: dataFim.value.trim(),
            dataInicio: dataInicio.value.trim(),
            nome: nome.value.trim(),
            descricao: descricao.value.trim(),
            imagemCapa: imagemCapa.value.trim()
        }
    }

    document.getElementById("btnEnviar").addEventListener("click", async function(){
        const Inputs = getInput()
        const dados = getValores(Inputs)

        console.log("Dados", dados)

        try{
            const ref = await addDoc(collection(db, "eventos"), dados)
            console.log("ID do documento", ref.id)
            alert("Evento cadastrado com sucesso")
        } catch (e){
            console.log("Erro", e)
        }

    })