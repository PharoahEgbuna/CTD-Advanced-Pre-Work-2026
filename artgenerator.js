function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


async function generateRandomArt() {

    // Fetch the total number of pages from the API
    const total_pages =  await fetch("https://api.artic.edu/api/v1/artworks")
    .then(response => response.json().then(data => data.pagination.total_pages));

    let random_page_num = getRndInteger(1, total_pages);
    let random_art_num = getRndInteger(1, 12);

    let response;

    try {
        //Attempt to fetch a random page of artworks with a limit of 12 items per page
        response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${random_page_num}&limit=12&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cplace_of_origin%2Cshort_description`);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (error) {
        console.error(error.message);
    }

    result = await response.json();
    getArtPiece = result.data[random_art_num];

    console.log(getArtPiece.image_id);
    let art_image = document.getElementById("art-image");
    let art_title = document.getElementById("art-title");
    let artist = document.getElementById("artist");

    art_image.src = `https://www.artic.edu/iiif/2/${getArtPiece.image_id}/full/843,/0/default.jpg`;
    art_title.textContent = `"${getArtPiece.title}"`;
    artist.textContent = getArtPiece.artist_display;
}

generateRandomArt();


