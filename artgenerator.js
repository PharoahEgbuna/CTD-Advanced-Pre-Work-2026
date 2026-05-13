function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateRandomArt() {

    //Fetch the total number of pages from the artworks API endpoint.
    const totalPages =  await fetch("https://api.artic.edu/api/v1/artworks").then(response => response.json()).then(data => data.pagination.total_pages);

    //Generate a random page number between 1 and the total number of pages.
    let randomPageNum = getRndInteger(1, totalPages);

    //Declare a variable to hold the HTTP response of the random page fetch request.
    let randomPage;

    //Attempt to fetch a random page from the API endpoint. 
    try {
        //The URL is tailored to retrieve the following information from each artwork: id, title, artist_display, image_id, place_of_origin, and short_description.
        //The page will have 12 artworks at most, as indicated by the limit parameter. Depending on the artwork, each field will have a null or non-null value.
        randomPage = await fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPageNum}&limit=12&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cplace_of_origin%2Cshort_description`)
        
        if (!randomPage.ok) {
            throw new Error(`Response status: ${randomPage.status}`);
        }
    } catch (error) {
        console.log(error.message);
    }

    //Convert the HTTP response to JSON and extract the data field, which is an array of up to 12 objects, each representing a different artwork.
    let pageData = await randomPage.json().then(data => data.data);

    //Select a random artwork from the array using a random index between 0 and the length of the array minus 1.
    let randomInt = getRndInteger(0, pageData.length - 1);
    let randomArt = pageData[randomInt];

    //Attempt to fetch the image file of the selected artwork, using the artwork's image_id field value.
    let artworkURL;
    try {
        artworkURL =  await fetch(`https://www.artic.edu/iiif/2/${randomArt.image_id}/full/843,/0/default.jpg`);

        if(!artworkURL.ok) {
            throw new Error(`Response status: ${artworkURL.status}`);
        }
    } catch(error) {
        console.log(error.message);
    }

    //Select the image, title, artist, description HTML elements by their id.
    let image = document.getElementById("art-image"); 
    let title = document.getElementById("art-title");
    let artist = document.getElementById("artist");
    let description = document.getElementById("description");

    //Check if the artwork fields have valid, non-null values and assign them to the corresponding HTML elements. Otherwise, assign default values.
    image.src = artworkURL.ok ? `https://www.artic.edu/iiif/2/${randomArt.image_id}/full/843,/0/default.jpg` : "images/no_picture_available.png";
    image.title = randomArt.title ? randomArt.title : "No image available.";

    title.textContent = randomArt.title ? `Title: "${randomArt.title}"` : "Title unknown.";

    artist.textContent = randomArt.artist_display ? `Created by/in: ${randomArt.artist_display}.` : "Artist unknown.";
    description.textContent = randomArt.short_description ? randomArt.short_description : "No description provided.";
}