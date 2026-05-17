# CTD-Advanced-Pre-Work-2026
My pre-work submission makes use of the Artworks and Products endpoints provided by the Art Institute of Chicago's API. 
To properly run my pre-work submission, you will need to download the repository onto your device and open one of the HTML files in your browser. 
I recommend opening index.html first, as it is the home page, though each page has navigation to the other webpages.

By clicking on the "Art Generator" hyperlink in the top right corner, you will arrive at the Art Generator webpage. 
Each time you press the "Generate Art" button, after a few seconds, a random artwork from the museum's collection will be displayed below. 
The following information will be provided about each generated work: the title, the artist/where the work was created, and a short description. 
If the API had a null value for any of these details, or the detail cannot be used (for example, an inaccessible image link), then a placeholder value is used instead. 

By clicking on the "Product List" hyperlink in the top right corner, you will arrive at the Product List webpage. 
When this page loads, it will autopopulate with the first page of products, which includes images of the products along with their names and prices.
Each time you click the "Next Page" button in the middle of the page, the next page of products will be populated, and the previous products will no longer be shown. 
If "Next Page" has been pressed at least once (you are no longer on the first page), then the "Previous Page" button begins to appear to the right of "Next Page". 
When you click the "Previous Page" button, you will go backwards one product page. If you use it to return to the first page, the "Previous Page" button will disappear. 
If the API had a null value for any of these details, or the detail cannot be used for some reason (for example, an inaccessible image link), then a placeholder value is used instead. 

That concludes my pre-work submission. Thank you for your time!
