// 'use strict';

function limparFormulario() {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('ibge').value = "";
    document.getElementById('siafe').value = "";
    document.getElementById('ddd').value = "";
    document.getElementById('complemento').value = "";
}


function preencherFormulario(endereco) {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('ibge').value = endereco.ibge;
    document.getElementById('siafe').value = endereco.siafi;
    document.getElementById('ddd').value = endereco.ddd;
    document.getElementById('complemento').value = endereco.complemento.toUpperCase();

}


//Regex para verificar o número do CEP
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
} 

async function pesquisarCep() {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    console.log(cep)
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        
        console.log(dados)

        const endereco = await dados.json();
        console.log(endereco)

        //Se a consulta da API não retornar um CEP, um erro ocorre
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
            
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

document.getElementById('cep').addEventListener('focusout',pesquisarCep);
//85814-800