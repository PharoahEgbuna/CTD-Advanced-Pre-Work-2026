function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateRandomArt() {

    //Fetch the total number of pages from the artworks endpoint.
    const totalPages =  await fetch("https://api.artic.edu/api/v1/artworks").then(response => response.json()).then(data => data.pagination.total_pages);

    //Generate a random page number between 1 and the total number of pages.
    let randomPageNum = getRndInteger(1, totalPages);

    //Declare a the randomPage variable to hold the random page fetch request.
    let randomPage;

    //Attempt to fetch the random page. If the request fails, throw an error message in the console and end  function execution with an empty return statement.
    try { 
        //The URL is tailored to retrieve the following fields for each artwork: id, title, artist_display (artist), image_id, place_of_origin, and short_description.
        //At most each page will have 12 artworks. Artwork fields may have null as their value.
        randomPage = await fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPageNum}&limit=12&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cplace_of_origin%2Cshort_description`)
        
        if (!randomPage.ok) {
            throw new Error(`Response status: ${randomPage.status}`);
        }
    } catch (error) {
        console.log(error.message);
        return;
    }

    //Convert the random page response to JSON and pull the data field, which is an array of up to 12 objects, each representing a different artwork.
    let pageData = await randomPage.json().then(data => data.data);

    //Select a random artwork from the array and assign it to the randomArt variable. 
    let randomArt = pageData[getRndInteger(0, pageData.length - 1)];

    //Attempt to fetch the image of the selected artwork. If the image cannot be retrieved, throw an error in the console and proceed. 
    let artworkURL;
    try {
        artworkURL =  await fetch(`https://www.artic.edu/iiif/2/${randomArt.image_id}/full/843,/0/default.jpg`);

        if(!artworkURL.ok) {
            throw new Error(`Response status: ${artworkURL.status}`);
        }
    } catch(error) {
        console.log(error.message);
    }

    //Connect variables to the image, title, artist, origin, and description HTML elements.
    let image = document.getElementById("art-image"); 
    let title = document.getElementById("art-title");
    let artist = document.getElementById("artist");
    let origin = document.getElementById("origin");
    let description = document.getElementById("description");

    //Check if the randomArt properties have useable values and assign them to the HTML elements. If the values are not useable, then placeholder values are used instead. 
    
    //If the image file be reached, assign it to the image's src attribute. 
    //Likewise, if the title was provided, assign that to the image's title attribute.
    image.src = artworkURL.ok ? `https://www.artic.edu/iiif/2/${randomArt.image_id}/full/843,/0/default.jpg` : "images/no_picture_available.png";
    image.title = randomArt.title ? randomArt.title : "No image available.";

    //If the title was provided, assign it to the title paragraph element.
    title.textContent = randomArt.title ? `Title: "${randomArt.title}"` : "Title unknown.";

    //If the artist was provided, assign it to the artist paragraph element.
    artist.textContent = randomArt.artist_display ? `Created by/in: ${randomArt.artist_display}.` : "Artist unknown.";

    //If the place of origin was provided, assign it to the origin paragraph element. 
    origin.textContent = randomArt.place_of_origin ? `Place of origin: ${randomArt.place_of_origin}.` : "Place of origin unknown.";

    //If the description was provided, assign it to the description paragraph element.
    description.textContent = randomArt.short_description ? `Short description: ${randomArt.short_description}` : "No short description provided.";
}