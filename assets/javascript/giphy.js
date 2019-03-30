var animals = ['dog', 'cat', 'bird', 'bear', 'turtle', 'rabbit'];

$(document).ready(function() {
    renderButtons();
});

function renderButtons() {
    $('#animal-buttons').empty()
    for (i = 0; i < animals.length; i++) {
        $('#animal-buttons').append("<button class='btn' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
    }
    buttonClick();
    $(document).on('click', '.gif', changeState);
}
function submitAnimal() {
    var animal = $('#animal-input').val().trim();
    animals.push(animal);
    renderButtons();
}
function buttonClick(){
    $('button').on('click', function() {
        var animal = $(this).attr('data-animal');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
            animal + '&api_key=jUuPBM5tKBKk0VqHzrzsdJVuyeYkzOkz';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            var results = response.data;
            $('#animal-images').empty();
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div>');
                var animalImage = $('<img>');
                animalImage.attr('src', results[i].images.original_still.url);
                animalImage.attr('data-still', results[i].images.original_still.url);
                animalImage.attr('data-animate', results[i].images.original.url);
                animalImage.attr('data-state', 'still');
                animalImage.attr('class', 'gif');
                animalDiv.append($('<p>').text('Rating: ' + results[i].rating));
                animalDiv.append(animalImage);
                $('#animal-images').append(animalDiv);
            }
        });
    });
}

function changeState(){
    var imageState = $(this).attr('data-state');

    if (imageState === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }

    else if (imageState === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
}
