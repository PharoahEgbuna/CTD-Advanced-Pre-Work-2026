function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

async function generateRandomArt() {

    // Fetch the total number of pages from the API
    const total_pages =  await fetch("https://api.artic.edu/api/v1/artworks")
    .then(response => response.json().then(data => data.pagination.total_pages));

    // Generate a random page number and a random integer.
    let random_page_num = getRndInteger(1, total_pages);

    let response;

    try {
        //Fetch a page containing 12 artworks using the random page number and convert to JSON. 
        //Each artwork will have a valid value or null for the fields: id, title, artist_display, image_id, place_of_origin, and short_description.
        response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${random_page_num}&limit=12&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cplace_of_origin%2Cshort_description`);
        response = await response.json();
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error.message);
    }

    //Select a random artwork from the page of 12 using a random integer.
    //The artwork will have a valid value or null for the fields: id, title, artist_display, image_id, place_of_origin, and short_description.
    let random_art_num = getRndInteger(1, 12);
    artWork = response.data[random_art_num];

    //Get the response from the image URL for the artwork, using the image_id field from the artwork.
    let image_URL =  await fetch(`https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`);

    //Connect to the image, title, artist, description elements from artgenerator.html
    let image = document.getElementById("art-image");
    let title = document.getElementById("art-title");
    let artist = document.getElementById("artist");
    let description = document.getElementById("description");

    //Check if the image URL is valid, and if the artwork has values for image_id, title, artist, and description. If any of the fields are null, alternative values are provided.
    if (!image_URL.ok || !artWork.image_id) {
        image.src = "images/no_picture_available.png";
        image.alt_text = "No image available."; 
    } else {
        image.src = `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`;
        image.title = artWork.title;
    }
    
    if (!artWork.title) {
        title.textContent = "Title unknown.";
    } else {
        title.textContent = `Title: "${artWork.title}"`;
    }
    
    if (!artWork.artist_display) {
        artist.textContent = "Artist unknown.";
    } else {
        artist.textContent = `Created by/in: ${artWork.artist_display}.`;
    }

    if (!artWork.short_description) {
        description.textContent = "No description available.";
    } else {
        description.textContent = artWork.short_description;
    }
}