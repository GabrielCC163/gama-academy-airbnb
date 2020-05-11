// *****************************
// Variaveis de controle
var PAGE_ATUAL = 0;
var SIZE_PAGE = 6;
var ARRAY_LOCACOES_JSON = [];
var LOCACOES_FILTO = [];

// *****************************
// Função get HTTP REQUEST
function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// *****************************
// lista todos as locacoestt
function listAll(page){
    for(let i=(page * SIZE_PAGE);
            i<(page * SIZE_PAGE) + SIZE_PAGE;
            i++){

        let objAp = LOCACOES_FILTO[i];
        var cardAp = `
                    <article class="col-sm-12 col-md-6 col-lg-4">
                    <div class="card card-ap">
                        <img src="${objAp.photo}" class="card-img-top" alt="${objAp.name}">
                        <div class="card-body">
                        <h5 class="card-title">${objAp.name}</h5>
                        <small class="card-text">${objAp.property_type} <br/> <span class="text-success"> <b>R$ ${objAp.price}</b>/noite</span></small>
                        </div>
                    </div>
                    </article>`;
        document.getElementById("root").innerHTML += cardAp;  
    }
     // verifica se nao possui nenhum resultado
     if(LOCACOES_FILTO.length == 0)
     document.getElementById("root").innerHTML = `<div class="col-sm-12 text-center">
                                                     <h3>
                                                         <b>Nenhum resultado encontrado :(</b>
                                                     </h3>
                                                 </div>`;
}


// *****************************
// filtra array de acordo com o termo passado de pesquisa
function _filtroPesquisa(obj, pesquisa){
    if(obj.name.search(pesquisa) != -1 || obj.property_type.search(pesquisa) != -1){
        return true;
    }else{
        return false;
    }
}

// *****************************
// Seta o cabeçalho da pagina
function setCountResults(){
    document.getElementById("qnt-ap").innerHTML = `Mostrando ${(PAGE_ATUAL+1) * SIZE_PAGE} de ${LOCACOES_FILTO.length} resultados.`;
}




window.onload = async function(){

    // *********************************************
    //
    // Captura os dados via api, e converte em json
    LOCACOES_FILTO = ARRAY_LOCACOES_JSON = JSON.parse(await httpGet("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"));
    // fim caputra de dados
    //
    // *********************************************
    
    // *********************************************
    //
    
    // qnt total
    setCountResults();
    listAll(PAGE_ATUAL);
    // fim listagem
    //
    // *********************************************

    // *********************************************
    //
    // filtra de acordo com a pesquisa
    document.getElementById("search-form").addEventListener("submit", function(event){
        event.preventDefault();
        // pega termo da pesquisa
        let pesquisa = document.getElementById("search-input").value;
        // filtra array
        LOCACOES_FILTO = ARRAY_LOCACOES_JSON.filter(obj => _filtroPesquisa(obj, pesquisa));
        // reseta resultados
        document.getElementById("root").innerHTML = "";
        PAGE_ATUAL = 0;
        // lista tudo
        listAll(PAGE_ATUAL);
        // qnt total      
        setCountResults();
    });
    // fim pesquisa
    //
    // *********************************************

    // *********************************************
    //
    // Botao de mostrar mais resultados 
    document.getElementById("btn-mais").addEventListener("click", function(){
        PAGE_ATUAL++;
        listAll(PAGE_ATUAL);
        setCountResults();
    });
    // fim mostrar mais resultados
    //
    // *********************************************

}