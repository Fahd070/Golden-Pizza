function displayComment() {
    var lang = currentLang || 'en';
    var reviews = (i18n[lang] || i18n.en).reviews;
    var starImg   = "../media/image/rating.png";
    var avatarImg = "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png";
    var result = "";
    reviews.forEach(function (rev) {
        result += `
        <div class="comment-item">
            <img class="photo" src="${avatarImg}" alt="photo">
            <p>${rev.p}</p>
            <span>${rev.name}</span>
            <img class="rating" src="${starImg}" alt="rating">
        </div>
        `;
    });
    document.querySelector(".comment-list").innerHTML = result;
}
