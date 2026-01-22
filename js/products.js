export let products = [{
    id: 2000,
    img: "http://127.0.0.1:5500/media/image/margherita.jpg",
    alt: "margherita",
    item: "Margherita Pizza",
    p: "Classic delight with 100% <br> real mozzarella cheese",
    price: 8.99
}, {
    id: 2001,
    img: "http://127.0.0.1:5500/media/image/pepperoni.jpg",
    alt: "pepperoni",
    item: "Pepperoni Pizza",
    p: "A classic favorite loaded <br> with pepperoni slices",
    price: 10.99
}, {
    id: 2002,
    img: "http://127.0.0.1:5500/media/image/vegetarian.jpg",
    alt: "vegetarian",
    item: "Vegetarian Pizza",
    p: "Loaded with fresh vegetables <br> and mozzarella cheese",
    price: 9.99
}, {
    id: 2003,
    img: "http://127.0.0.1:5500/media/image/bbq_chicken.jpg",
    alt: "bbq chicken",
    item: "BBQ Chicken Pizza",
    p: "Grilled chicken with BBQ <br>sauce and red onions",
    price: 11.99
}, {
    id: 2004,
    img: "http://127.0.0.1:5500/media/image/Meat_Pizza.jpg",
    alt: "Meat Pizza",
    item: "Meat Pizza",
    p: "Loaded with various <br>meats and cheeses",
    price: 12.99
}, {
    id: 2005,
    img: "http://127.0.0.1:5500/media/image/queso_Pizza.jpg",
    alt: "Queso Pizza",
    item: "Queso Pizza",
    p: "Loaded with cheese and spices", 
    price: 10.99
}];

export function displayProducts() {
    let result = "";

    products.forEach((ele) => {
        result += `
        <div class="Menu-item">
        <img src="${ele.img}" alt="${ele.alt}">
        <h3>${ele.item}</h3>
        <p>${ele.p}</p>
        <span>$${ele.price}</span>
        <div class="adding">
            <button class="add">Order</button>
            <select name="order-count" class="order-count">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
        </div>
        </div>
        `;
    });

    document.querySelector(".Menu-list").innerHTML = result;
}
displayProducts();