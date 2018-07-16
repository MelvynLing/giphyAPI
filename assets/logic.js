$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea')
    ///DEBUGGING
    console.log("1")
    
})

var searchArray = ['Simpsons','South Park','Rick and Morty','Family Guy','Adventure Time','Sponge Bob Square Pants','King of the Hill','Aqua Teen Hunger Force','The Ren & Stimpy Show','Futurama','Looney Tunes','Tom and Jerry','Beavis and Butthead',]
///DEBUGGING
console.log("111")

function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a=$('<button class="btn btn-danger text-white" style=" margin:5px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);">');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
///DEBUGGING
        console.log("1111")
    }
}

$(document).on('click','.searchButton',function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=QWcBTB9ui4nQIWiZAaHt9ZLbBGdErNe6&limit=10&rating=pg-13';
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
                            console.log("11111")

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
        ///DEBUGGING
        console.log("111111")
    }    
})

$("#addSearch").on('click', function(){
    var newSearch = $('#search-input').val();
    ///DEBUGGING
    console.log("hi");
    searchArray.push(newSearch);
    populateButtons(searchArray,'searchButton','#buttonsArea');
    return false;
})



//ive been having issues with this button. as it stands now, it does not generate a button in the buttonsArea div. when hitting submit, it reloads the page. Ive tried a few different approaches, but thye dont seem to work either. I also tried rewriting the HTML code for the form, but that yeilded no results as well.



/*


$("#search-form").on("click", function(event){
    event.preventDefault();
    var newSearch = $("input").val().trim();
    searchArray.push(newSearch);
    populateButtons();
  });



      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < movies.length; i++) {
          var a = $("<button>");
          a.addClass("movie-btn");
          a.attr("data-name", movies[i]);
          a.text(movies[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".movie-btn", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
*/