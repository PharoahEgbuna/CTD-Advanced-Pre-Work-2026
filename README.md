# CTD-Advanced-Pre-Work-2026
My pre-work submission makes use of the Artworks and Products endpoints provided by the Art Institute of Chicago's API. 
To properly run my pre-work, you will need to download the repository onto your device and open one of the HTML files in your browser. 
I recommend opening index.html, as it is the home page, although each page has navigation to the other webpages.

By clicking on the "Art Generator" hyperlink in the top right corner, you will arrive at the Art Generator webpage. 
Whenever you click  the "Generate Art" button, after a few seconds, a random artwork from the museum's collection will be displayed. 
The following information  about the generated work will also be displayed: the title, the artist/where the work was created, the work's place of origin, and a short description. 
If the API had a null value for any of these details, or if the detail cannot be accessed (for example, 404 not found or 403 forbidden when attempting to retrieve an image file), then a placeholder value is used instead. 

By clicking on the "Product List" hyperlink in the top right corner, you will arrive at the Product List webpage. 
When this page loads, it will autopopulate with the first page of products, which includes images of the products along with their names and prices.
When you click the "Next Page" button in the middle of the page, after a few seconds, the next page of products will populate, and the previous page's products will no longer be shown. 
If "Next Page" has been pressed at least once (meaning you are no longer on the first page), the "Previous Page" button begins to appear to the right of the "Next Page" button. 
When you click the "Previous Page" button, you will go backwards one product page. If you return to the first page, the "Previous Page" button will disappear. 
If the API had a null value for any of these details (image, name, price), or the detail cannot be used for some reason (for example, an inaccessible image link), then a placeholder value is used instead. 

The same CSS styling is used for all pages. 
My JS files include comments on how the code is intended to function. 

That concludes my pre-work submission. Thank you for your time!
