const count = document.querySelector("#count");
const subtotal = document.querySelector(".subtotal");
const discount = document.querySelector(".discount");
const quantity = document.querySelectorAll("#quantity");
const promocode = document.querySelector("#promo-code");
const total = document.querySelector("#total");
const row = document.querySelector(".products");
const info = document.querySelector(".info");
const checkout = document.querySelector("#checkout");

let products = [
    {
        id: 1,
        name: "Hamburger",
        brand: "Burgerillas",
        price: 230,
        image: `<i class="fa-solid fa-burger"></i>`,
        quantity: 1,
    },
    {
        id: 2,
        name: "Pizza",
        brand: "Dominos",
        price: 250,
        image: `<i class="fa-solid fa-pizza-slice"></i>`,
        quantity: 1,
    },
    {
        id: 3,
        name: "Cookie",
        brand: "Starbucks",
        price: 120,
        image: `<i class="fa-solid fa-cookie"></i>`,
        quantity: 1,
    },
];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});

const initialTotal = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
}, 0);

subtotal.innerHTML = initialTotal;
total.innerHTML = initialTotal;
count.innerText = products.length;

const renderProducts = (products) => {
    row.innerHTML = "";

    products.map((product) => {
        const html = `
            <div class="row">
                <div class="col left">
                    <div class="thumbnail">
                        ${product.image}
                    </div>
                    <div class="detail">
                        <div class="name">${product.name}</div>
                        <div class="description">${product.brand}</div>
                        <div class="price">${product.price * product.quantity}</div>
                    </div>
                </div>

                <div class="col right">
                    <div class="quantity">
                        <input type="number" class="quantity" data-product-id="${product.id}" value="${product.quantity}" />
                    </div>

                    <div onclick="deleteProduct(${product.id})" class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
        `;

        row.innerHTML += html;
    });

    const quantityInputs = document.querySelectorAll('.quantity input');

    quantityInputs.forEach((input) => {
        input.addEventListener('keyup', (e) => {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            const newQuantity = parseInt(e.target.value);

            products.forEach((product) => {
                if (product.id === productId) {
                    product.quantity = newQuantity;
                }
            });

            renderProducts(products);

            const fiyat = products.reduce((acc, product) => {
                return acc + product.price * product.quantity;
            }, 0);
            subtotal.innerHTML = fiyat;
            total.innerHTML = fiyat;

        });
    });
};

promocode.addEventListener("keyup", (e) => {
    let discountCount = e.target.value;
    discount.innerHTML = discountCount;
    total.innerHTML = subtotal.innerHTML * (1 - discountCount / 100);
});

const deleteProduct = (productId) => {
    products = products.filter((product) => product.id != productId);
    renderProducts(products);
    const fiyat = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
    subtotal.innerHTML = fiyat;
    total.innerHTML = fiyat;
    count.innerText = products.length

    if (products.length <= 0) {
        info.classList.remove("d-none")
        info.classList.add("d-block")
        checkout.classList.add("d-none")
    }
};