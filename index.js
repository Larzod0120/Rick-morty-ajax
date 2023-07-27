let characters = [];
let selectedCharacters = [];
let link = 'https://rickandmortyapi.com/api/character';
let btnNext;
let btnPrev;


const getPage = (url) => {
    $.ajax({
        type: 'GET',
        url: `${url}`,
        success: function (resp) {

            console.log(resp);
            
            getCard(url);

            btnNext = resp.info.next ? $('#btn-next').attr(`data-url`, `${resp.info.next}`) : '';

            btnPrev = resp.info.prev ? $('#btn-prev').attr(`data-url`, `${resp.info.prev}`) : '';
        }
    })
}

const getCard = (url) => {
    $.ajax({
        type: 'GET',
        url: `${url}`,
        success: function (result) {
            characters = result.results;
            console.log(result);
            allCharacters();
            renderCharacters();
            

        }, error: function (error) {
            console.log(error)
        }
    });
};

function renderCharacters() { 

    function shuffle(arr) {
        let cantidad = arr.length;
        while (cantidad) {
            let posicion = Math.floor(Math.random() * cantidad--);

            [arr[cantidad], arr[posicion]] = [arr[posicion], arr[cantidad]]
        }

        return arr
    }

    shuffle(characters)

    selectedCharacters = characters.slice(0, 6);

    selectedCharacters.forEach((ch) => {
        $(".card-cont").append(`
        <div class="kard">
        <figure class="img-card">
                <img class="image-src" src=${ch.image}>
                </figure>
        </div>
        `);

        
        
    });
        
    $(".kard").each(function () {

        $(this).on("click", function () {
            const elemento = this;
            let imageSrc = $(elemento).find(".image-src").attr('src');

            $("#modal-body").html(`
            <img src="${imageSrc}">
            `);

                $("#modal-window").show();
                
            })
        
        })

        

}

//ALL CHARACTERS FUNCTION

function allCharacters() {
    characters.forEach((ch) => {
        $('.characters-cont').append(`
        <div class="character">
        <figure class="character-cont">
        <img src="${ch.image}">
        </figure>
        </div>
        `)
    })
}




$(document).ready(function ($) {
    
    getPage(link);
    
    

    //Botón random
    $('#random').on("click", function () {
        $(".kard").remove();
        renderCharacters();
    })

    //Botón para cerrar el modal
    $("#btn-close").on("click", function () {
            $("#modal-window").hide();
    })
    

    //Botones next y prev

    $('.page-btn').on('click', function (e) {
        $(".character").remove();
        
        let value = e.target.dataset.url;
        console.log(value)
        getPage(value);
    })

    
})