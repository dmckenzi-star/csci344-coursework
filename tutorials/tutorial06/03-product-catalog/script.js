const products = [
    {
        name: "Laptop",
        price: 999.99,
        description: "High-performance laptop for work and play",
        category: "Electronics",
        inStock: true,
    },
    {
        name: "Coffee Maker",
        price: 49.99,
        description: "Brew perfect coffee every morning",
        category: "Appliances",
        inStock: true,
    },
    {
        name: "Chair",
        price: 149.99,
        description: "Just an office chair",
        category: "Furniture",
        inStock: false,
    },
];

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function createProductCard(product) {
    return `
        <section class="product-card">
            <h2>${product.name}</h2>
            <div class="price">${formatPrice(product.price)}</div>
            <p class="description">${product.description}</p>
            <span class="category">${product.category}</span>
            <span class="${product.inStock ? 'stock-status in-stock' : 'stock-status out-of-stock'}">
                ${product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
        </section>
    `;
}

function renderProducts() {
    const productGridEl = document.querySelector('#productGrid');
    productGridEl.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        const html = createProductCard(products[i]);
        productGridEl.insertAdjacentHTML('beforeend', html);
    }
}

const productForm = document.querySelector('#productForm');

function addItemToList(event) {
    event.preventDefault();

    const newProduct = {
        name: document.querySelector('#productName').value.trim(),
        price: Number(document.querySelector('#productPrice').value),
        description: document.querySelector('#productDescription').value.trim(),
        category: document.querySelector('#productCategory').value,
        inStock: document.querySelector('#productInStock').checked,
    };

    products.push(newProduct);
    renderProducts();
    productForm.reset();
}

productForm.addEventListener('submit', addItemToList);

renderProducts();