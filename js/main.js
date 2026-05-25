// ── Init language, products, comments ─────────────────────────────────
setLanguage(currentLang);
displayProducts();
displayComment();

// ── Language Select ────────────────────────────────────────────────────
document.getElementById('langSelect').addEventListener('change', function () {
    setLanguage(this.value);
    displayProducts();
    displayComment();
});

// ── Home Button (scroll to top) ────────────────────────────────────────
document.getElementById('homeBtn').onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Login ──────────────────────────────────────────────────────────────
var loginBtn    = document.getElementById('loginBtn');
var loginDialog = document.getElementById('loginDialog');

loginBtn.onclick = function () {
    loginDialog.innerHTML = `
        <button class="dialog-close" id="closeLogin"><i class="ri-close-large-line"></i></button>
        <div class="login-header">
            <img src="../media/image/logo.png" alt="logo">
            <h2>Welcome Back</h2>
            <p>Sign in to your Golden Pizza account</p>
        </div>
        <form id="loginForm">
            <div class="field-group">
                <i class="ri-user-line"></i>
                <input type="text" placeholder="Username" required>
            </div>
            <div class="field-group">
                <i class="ri-lock-line"></i>
                <input type="password" placeholder="Password" required>
            </div>
            <label class="remember-row">
                <input type="checkbox">
                <span>Remember me</span>
            </label>
            <button type="submit" class="login-submit">Sign In</button>
            <p class="signup-link">Don't have an account? <a href="#">Sign up</a></p>
        </form>
    `;
    loginDialog.showModal();

    document.getElementById('closeLogin').onclick = function () { loginDialog.close(); };

    document.getElementById('loginForm').onsubmit = function (e) {
        e.preventDefault();
        loginDialog.innerHTML = `
            <div class="login-success">
                <div class="success-icon">✅</div>
                <h2>Signed In!</h2>
                <p>Welcome back to Golden Pizza 🍕</p>
                <button id="closeSuccess">Continue</button>
            </div>
        `;
        document.getElementById('closeSuccess').onclick = function () { loginDialog.close(); };
    };
};

// ── Search ─────────────────────────────────────────────────────────────
var searchBtn     = document.getElementById('searchBtn');
var searchOverlay = document.getElementById('searchOverlay');
var searchInput   = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

searchBtn.onclick = function () {
    searchOverlay.classList.add('active');
    searchInput.focus();
};

document.getElementById('searchClose').onclick = closeSearch;

function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) closeSearch();
});

searchInput.oninput = function () {
    var q    = this.value.toLowerCase().trim();
    var lang = currentLang || 'en';
    if (!q) { searchResults.innerHTML = ''; return; }

    var hits = products.filter(function (p) {
        var name = p[lang] ? p[lang].item : p.en.item;
        var desc = p[lang] ? p[lang].p : p.en.p;
        return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
    });

    if (hits.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No pizzas found for "<strong>' + q + '</strong>"</p>';
        return;
    }

    searchResults.innerHTML = hits.map(function (p) {
        var name = p[lang] ? p[lang].item : p.en.item;
        return `
            <a href="orderPage.html?id=${p.id}" class="search-result-item">
                <img src="${p.img}" alt="${p.alt}">
                <div class="result-info">
                    <h4>${name}</h4>
                    <span class="result-price">$${p.price.toFixed(2)}</span>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </a>
        `;
    }).join('');
};

// ── Card click navigates to order page ────────────────────────────────
document.querySelector('.Menu-list').addEventListener('click', function (e) {
    var card = e.target.closest('.Menu-item[data-id]');
    if (card && !e.target.classList.contains('add') && !e.target.closest('select') && !e.target.closest('a')) {
        window.location.href = 'orderPage.html?id=' + card.dataset.id;
    }
});

// ── Global Escape key ──────────────────────────────────────────────────
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSearch();
        try { loginDialog.close(); } catch (_) {}
    }
});
