export let comments = [{
    imgSelf: "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png",
    p: "The best pizza I've ever had! The crust was perfect and the toppings were <br> fresh and flavorful.",
    name: "- Sarah K.",
    star: "../media/image/rating.png"
}, {
    imgSelf: "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png",
    p: "Golden Pizza never disappoints. Their variety of pizzas caters to all tastes, and the service is always top-notch.",
    name: "- Mike D.",
    star: "../media/image/rating.png"
}, {
    imgSelf: "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png",
    p: "I love their vegetarian options! The Veggie Delight pizza is my go-to choice. <br> Highly recommend!",
    name: "- Emily R.",
    star: "../media/image/rating.png"
}];

export function displayComment () {
    let result = "";
    comments.forEach((ele) => {
        result += `
        <div class="comment-item">
                    <img class="photo" src="${ele.imgSelf}" alt="photo">
                    <p>${ele.p}</p>
                    <span>${ele.name}</span>
                    <img class="rating" src="${ele.star}" alt="rating">
                </div>
        `;
    })
    document.querySelector(".comment-list").innerHTML = result;
}
displayComment();