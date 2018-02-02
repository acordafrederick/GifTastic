// standard document.ready ================
$(document).ready(function() {
// array to store the search topics
  var topics = ["RPDR", "All Stars 2", "Sasha Velour", "All Stars 1", "Bob the Drag Queen", "All Stars 3"];

  function displayUserGifs() {
  
  //$("button").on("click", function() {
    $("#gifsGoHere").empty();
    var userInput = $(this).attr("data-name");
    //console.log(userInput);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="
      + userInput
      + "&api_key=dc6zaTOxFJmzC&limit=10"

  	$.ajax({
  		url: queryURL,
  		method: "GET"
      })

      .then(function(response) {
        var results = response.data;
  		  //console.log(results);

        for (var i = 0; i < results.length; i++) {

          var resultContainer = $("<div class='card'>")
          
          var rating = results[i].rating;
          var showRating = $("<p class='card-text text-center'>").text("Rating: " + rating);
          
          var animatedGifs = results[i].images.fixed_width.url;
          var stillGifs = results[i].images.fixed_width_still.url;
          var showImage = $("<img class='card-img-top'>");

            showImage.attr("src", stillGifs);
            showImage.addClass("animationControl");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", stillGifs);
            showImage.attr("data-animate", animatedGifs);
            
            resultContainer.append(showImage);
            resultContainer.append(showRating);
            $("#gifsGoHere").prepend(resultContainer);

          }
      });
  }
      
  //////

  function showButtons() {
  	$("#buttonsGoHere").empty();
  	for (var i = 0; i < topics.length; i++) {
  		var button = $("<button class='btn btn-sm'>");
  		button.addClass("gif-button").addClass("rupaulsdragrace");
  		button.attr("data-name", topics[i]);
  		button.text(topics[i]);
  		$("#buttonsGoHere").prepend(button);
  		//console.log(button);
  	}
  }
  

  function stillAnimate() {  
    var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  }

  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    var newInput = $("#userInput").val().trim();
    topics.push(newInput);
    //console.log(topics);
    showButtons();
    //console.log(newInput);
  });

 $(document).on("click", ".gif-button", displayUserGifs);

  $(document).on("click", ".animationControl", stillAnimate);


  showButtons();
});


