//Initialize a counter variable to represent what page the user is currently on. Begins at 1. 
let counter = 1;

async function fetchProducts() {

    const total_pages = await fetch("https://api.artic.edu/api/v1/products")
    .then(response => response.json().then(data => data.pagination.total_pages));

    if (counter < total_pages) {
         
        let current_page;

        //Attempt to fetch the a product page using the products API and the counter variable. If it cannot be reached, throw an error message and end function execution. 
        try {
            current_page = await fetch(`https://api.artic.edu/api/v1/products?page=${counter}&limit=12`)
            
            if (!current_page.ok) {
                throw new Error("No data received");
            }

            current_page = await current_page.json();
        } catch (error) {
            console.error("Unable to fetch products:", error);
            return;
        }

        //Remove any pre-existing children of the HTML product list to make room for new products.
        let productList = document.querySelector(".productlist");
        if (productList.hasChildNodes()) {
            productList.replaceChildren();
        }

        //Populate the product list with each product of the current page. If a product field is not provided, use a placeholder value instead.
        for (let product of current_page.data) {
            let productItem = document.createElement("li");
            let productImage = document.createElement("img");
            let productTitle = document.createElement("h3");
            let productPrice = document.createElement("p");

            let imageURL;
            try {
                imageURL = await fetch(product.image_url);
                if (!imageURL.ok) {
                    throw new Error("Image not found");
                }
            } catch (error) {
                console.error(`Unable to fetch image for product ${product.id}:`, error);
            }

            if (!imageURL.ok) {
                productImage.src = 'images/no_picture_available.png';
            } else {
                productImage.src = product.image_url;
            }

            productTitle.textContent = product.title ? product.title : 'No Title Available';
            productPrice.textContent = product.max_current_price ? `Price: $${product.max_current_price.toFixed(2)}` : 'No Price Available' ;

            //Append the product image, title, and price to the current list item.
            productItem.appendChild(productImage);
            productItem.appendChild(productTitle);
            productItem.appendChild(productPrice);

            //Append the list item to the list. 
            productList.appendChild(productItem);
        }
    }
}

//Increase the counter variable by 1 and call the fetchProducts function. 
let nextPage = function () {
    counter++;
    fetchProducts();
    
    //Display the 'Previous Page' button if the user is not on the first page.
    document.getElementById("previouspage").style.display = "inline-block";
}

//Decrease the counter variable by 1 and call the fetchProducts function.
let previousPage = function () {

    if (counter >= 2) {
        counter--;
        fetchProducts();
    }

    //Hide the 'Previous Page' button if the user is on the first page. 
    if (counter === 1) {
        document.getElementById("previouspage").style.display = "none";
    }
}

//Call the fetchProducts function on page load to populate with the first page of products.
fetchProducts();
