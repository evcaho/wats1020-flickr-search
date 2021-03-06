
// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
//this
	var searchImages = function(tags){
		var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		console.log (tags);
		//I included a colsole.log here to make sure that the user input was loading correctly
		$.getJSON( flickrAPI, {
			//Iquery example about Mt. Rainier but with tags switched to be open to user input
   			 tags: tags,
   			 tagmode: "any",
    		format: "json"
			//the done function in jQuery is for when the json  call is successful
		}).done(function( data ) {
			//.empty clears out the page, so a new search won't load images after the previous images
			$("#images").empty();
    		$.each( data.items, function( i, item ) {
				//this creates a new <li> for each new image
				var newItem = $("<li>");
				newItem.appendTo("#images");
        		$( "<img>" ).attr( "src", item.media.m ).appendTo( newItem );
				//this changes the html to reflect the search input of the user
				$('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
    //this adds the title/date/link to each image
       			var newTitle = $('<p class="image-title">').html(item.title).appendTo(newItem);
       			var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newItem);
        		var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newItem);
				// this is my limit on the number of images I'd like loaded onto the page
        		if ( i === 15 ) {
        			return false;
        		}
      	    });
    	});	

	};
			
			

    $('button.search').on('click', function(event){
		console.log("hello3");

    	event.preventDefault();
   		var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    	console.log(searchTextInput.value);
		searchImages(searchTextInput.value);
	});
	
	});
	


    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target




