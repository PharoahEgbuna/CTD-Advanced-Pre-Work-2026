//Initialize a counter variable to represent what page the user is currently on. Begins at 1. 
let counter = 1;

async function fetchProducts() {

    const total_pages = await fetch("https://api.artic.edu/api/v1/products")
    .then(response => response.json().then(data => data.pagination.total_pages));

    if (counter < total_pages) {
        
        //Fetch the current product page using the products API and the counter variable. 
        let current_page = await fetch(`https://api.artic.edu/api/v1/products?page=${counter}&limit=12`)
        .then(response => response.json());

        //Remove any pre-existing children of the product list to make room for new products.
        let productList = document.querySelector(".productlist");
        if (productList.hasChildNodes()) {
            productList.replaceChildren();
        }

        for (let product of current_page.data) {
            let productItem = document.createElement("li");
            let productImage = document.createElement("img");
            let productTitle = document.createElement("h3");
            let productPrice = document.createElement("p");

            productImage.src = product.image_url || 'images/no_picture_available.png';
            productTitle.textContent = product.title || 'No Title Available';
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


let nextPage = function () {
    counter++;
    fetchProducts();
    
    //Display the 'Previous Page' button if the user is on the second page or higher.
    document.getElementById("previouspage").style.display = "inline-block";
}

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

//Call the function automatically to populate the page with products on page load.
fetchProducts();
