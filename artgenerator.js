function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

async function generateRandomArt() {

    // Fetch the total number of pages from the API
    const total_pages =  await fetch("https://api.artic.edu/api/v1/artworks")
    .then(response => response.json().then(data => data.pagination.total_pages));

    // Generate a random page number and a random integer.
    let random_page_num = getRndInteger(1, total_pages);
    let random_art_num = getRndInteger(1, 12);

    let response;

    try {
        //Attempt to fetch a page of artworks, 12 total, using the random page number
        response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${random_page_num}&limit=12&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cplace_of_origin%2Cshort_description`);
        response = await response.json();
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
    }

    //Select a random artwork from the 12 artworks on the page
    artWork = response.data[random_art_num];

    //Get the image URL for the artwork.
    let imageURL =  await fetch(`https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`);

    //Get the image, title, artist, description elements from artgenerator.html
    let image = document.getElementById("art-image");
    let title = document.getElementById("art-title");
    let artist = document.getElementById("artist");
    let description = document.getElementById("description");

    //Check if the artwork has values for image_id, title, artist, and description. Also check if the imageURL is valid. Provide alternative values if not. 
    if (!imageURL.ok || !artWork.image_id) {
        image.src = "images/no_picture_available.png";
        image.alt_text = "No image available."; 
    } else {
        image.src = `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`;
        image.title = artWork.title;
    }
    
    if (!artWork.title) {
        title.textContent = "Title unknown.";
    } else {
        title.textContent = `"${artWork.title}"`;
    }
    
    if (!artWork.artist_display) {
        artist.textContent = "Artist unknown.";
    } else {
        artist.textContent = artWork.artist_display;
    }

    if (!artWork.short_description) {
        description.textContent = "No description available.";
    } else {
        description.textContent = artWork.short_description;
    }
}