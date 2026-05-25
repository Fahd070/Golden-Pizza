var products = [{
    id: 2000,
    img: "../media/image/margherita.jpg",
    alt: "margherita",
    price: 8.99,
    en: { item: "Margherita Pizza", p: "Classic delight with 100% real mozzarella cheese" },
    ar: { item: "بيتزا مارغريتا", p: "متعة كلاسيكية بجبن الموزاريلا الطبيعية 100%" }
}, {
    id: 2001,
    img: "../media/image/pepperoni.jpg",
    alt: "pepperoni",
    price: 10.99,
    en: { item: "Pepperoni Pizza", p: "A classic favorite loaded with pepperoni slices" },
    ar: { item: "بيتزا بيبيروني", p: "الكلاسيكية المحبوبة المحملة بشرائح البيبيروني" }
}, {
    id: 2002,
    img: "../media/image/vegetarian.jpg",
    alt: "vegetarian",
    price: 9.99,
    en: { item: "Vegetarian Pizza", p: "Loaded with fresh vegetables and mozzarella cheese" },
    ar: { item: "بيتزا خضار", p: "محملة بالخضروات الطازجة وجبن الموزاريلا" }
}, {
    id: 2003,
    img: "../media/image/bbq_chicken.jpg",
    alt: "bbq chicken",
    price: 11.99,
    en: { item: "BBQ Chicken Pizza", p: "Grilled chicken with BBQ sauce and red onions" },
    ar: { item: "بيتزا دجاج مشوي", p: "دجاج مشوي مع صوص البي بي كيو والبصل الأحمر" }
}, {
    id: 2004,
    img: "../media/image/Meat_Pizza.jpg",
    alt: "Meat Pizza",
    price: 12.99,
    en: { item: "Meat Pizza", p: "Loaded with various meats and cheeses" },
    ar: { item: "بيتزا لحوم", p: "محملة بأنواع متعددة من اللحوم والجبن" }
}, {
    id: 2005,
    img: "../media/image/queso_Pizza.jpg",
    alt: "Queso Pizza",
    price: 10.99,
    en: { item: "Queso Pizza", p: "Loaded with cheese and spices" },
    ar: { item: "بيتزا كيسو", p: "محملة بالجبن والتوابل الشهية" }
}];

function displayProducts() {
    var lang = currentLang || 'en';
    var t = i18n[lang] || i18n.en;
    var result = "";
    products.forEach(function (ele) {
        var name = ele[lang] ? ele[lang].item : ele.en.item;
        var desc = ele[lang] ? ele[lang].p : ele.en.p;
        result += `
        <div class="Menu-item" data-id="${ele.id}">
            <a href="orderPage.html?id=${ele.id}">
                <img src="${ele.img}" alt="${ele.alt}">
            </a>
            <h3>${name}</h3>
            <p>${desc}</p>
            <span>$${ele.price.toFixed(2)}</span>
            <div class="adding">
                <select name="order-count" class="order-count">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button class="add" onclick="window.location.href='orderPage.html?id=${ele.id}'">${t.orderBtn}</button>
            </div>
        </div>
        `;
    });
    document.querySelector(".Menu-list").innerHTML = result;
}
