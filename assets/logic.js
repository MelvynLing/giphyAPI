$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea')
    
})

var searchArray = ['Simpsons','South Park','Rick and Morty','Family Guy','Adventure Time','Sponge Bob Square Pants','King of the Hill','Aqua Teen Hunger Force','The Ren & Stimpy Show','Futurama','Looney Tunes','Tom and Jerry','Beavis and Butthead',]

function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a=$('<button class="btn btn-danger text-white" style=" margin:5px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);">');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click','.searchButton',function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=QWcBTB9ui4nQIWiZAaHt9ZLbBGdErNe6&limit=10&rating=pg-13';
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response){
            for(var i=0;i<response.data.length;i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response.data[i].images.fixed_height.url; 
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                    image.attr('src',still);
                    image.attr('data-still',still);
                    image.attr('data-animated',animated);
                    image.attr('data-state','still');
                    image.addClass('searchImage');
                        searchDiv.append(p);
                        searchDiv.append(image);
                            $('#searches').append(searchDiv);
            }
        })
})

$(document).on('click','.searchImage',function() {
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }    
})

$('#buttonsArea').on('click', function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray,'searchButton','#buttonsArea');
    return false;
})