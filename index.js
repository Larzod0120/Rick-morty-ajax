let characters = [];
let selectedCharacters = [];

const getCard = () => {
    $.ajax({
        type: 'GET',
        url: 'https://rickandmortyapi.com/api/character',
        success: function (result) {
            characters = result.results;
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
    
    
    getCard();
    

    $('#random').on("click", function () {
        $(".kard").remove()
        renderCharacters();
    })

    $("#btn-close").on("click", function () {
            $("#modal-window").hide();
        })

    
})