// ── Read URL param ─────────────────────────────────────────────────────
var params  = new URLSearchParams(window.location.search);
var pizzaId = parseInt(params.get('id'));
var pizza   = products.find(function (p) { return p.id === pizzaId; });

if (!pizza) {
    window.location.href = 'mainPage.html#menu';
}

// ── Init language ──────────────────────────────────────────────────────
setLanguage(currentLang);

// ── Pizza content (language-aware) ────────────────────────────────────
function applyPizzaLang() {
    var lang = currentLang;
    var name = pizza[lang] ? pizza[lang].item : pizza.en.item;
    var desc = pizza[lang] ? pizza[lang].p : pizza.en.p;
    document.getElementById('orderImg').src                    = pizza.img;
    document.getElementById('orderImg').alt                    = pizza.alt;
    document.getElementById('orderName').textContent           = name;
    document.getElementById('orderDesc').textContent           = desc;
    document.getElementById('summaryImg').src                  = pizza.img;
    document.getElementById('summaryImg').alt                  = pizza.alt;
    document.getElementById('summaryName').textContent         = name;
    document.getElementById('pizzaNameBreadcrumb').textContent = name;
    document.title = (lang === 'ar' ? 'طلب ' : 'Order ') + name + ' – Golden Pizza';
}
applyPizzaLang();

// ── State ──────────────────────────────────────────────────────────────
var qty       = 1;
var sizeAdj   = 0;
var extrasSum = 0;

function fmt(n) { return '$' + n.toFixed(2); }

function calcTotal() {
    return (pizza.price + sizeAdj + extrasSum) * qty;
}

function refreshSummary() {
    var t         = i18n[currentLang] || i18n.en;
    var sizeEl    = document.querySelector('input[name="size"]:checked');
    var sizeLabel = sizeEl ? sizeEl.closest('.size-btn').querySelector('.size-name').textContent : t.sizeMedium;

    document.getElementById('summarySize').textContent  = sizeLabel;
    document.getElementById('basePrice').textContent    = fmt(pizza.price);
    document.getElementById('sizePrice').textContent    = (sizeAdj >= 0 ? '+' : '') + fmt(sizeAdj);
    document.getElementById('extrasPrice').textContent  = '+' + fmt(extrasSum);
    document.getElementById('qtyBadge').textContent     = '×' + qty;
    document.getElementById('totalPrice').textContent   = fmt(calcTotal());
    document.getElementById('qtyDisplay').textContent   = qty;
}

// ── Quantity ───────────────────────────────────────────────────────────
document.getElementById('qtyMinus').onclick = function () {
    if (qty > 1) { qty--; refreshSummary(); }
};
document.getElementById('qtyPlus').onclick = function () {
    if (qty < 10) { qty++; refreshSummary(); }
};

// ── Size ───────────────────────────────────────────────────────────────
document.querySelectorAll('input[name="size"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        var adj = { small: -2, medium: 0, large: 3 };
        sizeAdj = adj[this.value] !== undefined ? adj[this.value] : 0;
        document.querySelectorAll('.size-btn').forEach(function (b) { b.classList.remove('active'); });
        this.closest('.size-btn').classList.add('active');
        refreshSummary();
    });
});

// ── Extras ─────────────────────────────────────────────────────────────
document.querySelectorAll('.extra-check').forEach(function (cb) {
    cb.addEventListener('change', function () {
        extrasSum = Array.from(document.querySelectorAll('.extra-check:checked'))
            .reduce(function (sum, el) { return sum + parseFloat(el.value); }, 0);
        refreshSummary();
    });
});

// ── Place Order ────────────────────────────────────────────────────────
var crustKeyMap = {
    'Classic': 'crustClassic',
    'Thin & Crispy': 'crustThin',
    'Thick & Fluffy': 'crustThick'
};
var extraKeyMap = {
    'Extra Cheese': 'extraCheese',
    'Extra Sauce': 'extraSauce',
    'Mushrooms': 'extraMushrooms',
    'Jalapeños': 'extraJalapenos',
    'Olives': 'extraOlives',
    'Bell Peppers': 'extraBellPeppers'
};

document.getElementById('placeOrderBtn').onclick = function () {
    var t         = i18n[currentLang] || i18n.en;
    var lang      = currentLang;
    var pizzaName = pizza[lang] ? pizza[lang].item : pizza.en.item;
    var sizeEl    = document.querySelector('input[name="size"]:checked');
    var crustEl   = document.querySelector('input[name="crust"]:checked');
    var sizeLabel = sizeEl ? sizeEl.closest('.size-btn').querySelector('.size-name').textContent : t.sizeMedium;
    var crustKey  = crustEl ? crustKeyMap[crustEl.value] : 'crustClassic';
    var crustLabel = t[crustKey] || (crustEl ? crustEl.value : 'Classic');
    var extras = Array.from(document.querySelectorAll('.extra-check:checked')).map(function (el) {
        var key = extraKeyMap[el.dataset.name];
        return key ? (t[key] || el.dataset.name) : el.dataset.name;
    });
    var notes = document.getElementById('specialInstructions').value.trim();

    document.getElementById('confirmDetails').innerHTML =
        '<p>🍕 <strong>' + pizzaName + '</strong></p>' +
        '<p>' + t.confirmSizeLabel + ' <strong>' + sizeLabel + '</strong></p>' +
        '<p>' + t.confirmCrustLabel + ' <strong>' + crustLabel + '</strong></p>' +
        (extras.length ? '<p>' + t.confirmExtrasLabel + ' <strong>' + extras.join(', ') + '</strong></p>' : '') +
        (notes ? '<p>' + t.confirmNotesLabel + ' <strong>' + notes + '</strong></p>' : '') +
        '<p>' + t.confirmQtyLabel + ' <strong>' + qty + '</strong></p>' +
        '<p>' + t.confirmTotalLabel + ' <strong style="color:#ffcc00">' + fmt(calcTotal()) + '</strong></p>';

    document.getElementById('confirmOverlay').classList.add('active');
};

document.getElementById('confirmClose').onclick = function () {
    window.location.href = 'mainPage.html#menu';
};

// ── Language ───────────────────────────────────────────────────────────
document.getElementById('langSelect').addEventListener('change', function () {
    setLanguage(this.value);
    applyPizzaLang();
    refreshSummary();
});

// ── Home Button ────────────────────────────────────────────────────────
document.getElementById('homeBtn').onclick = function () {
    window.location.href = 'mainPage.html';
};

// ── Header — Login ─────────────────────────────────────────────────────
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
            <div class="field-group"><i class="ri-user-line"></i><input type="text" placeholder="Username" required></div>
            <div class="field-group"><i class="ri-lock-line"></i><input type="password" placeholder="Password" required></div>
            <label class="remember-row"><input type="checkbox"><span>Remember me</span></label>
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

// ── Header — Search ────────────────────────────────────────────────────
var searchBtn     = document.getElementById('searchBtn');
var searchOverlay = document.getElementById('searchOverlay');
var searchInput   = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

searchBtn.onclick = function () { searchOverlay.classList.add('active'); searchInput.focus(); };

document.getElementById('searchClose').onclick = function () {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
};

searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

searchInput.oninput = function () {
    var q    = this.value.toLowerCase().trim();
    var lang = currentLang || 'en';
    if (!q) { searchResults.innerHTML = ''; return; }
    var hits = products.filter(function (p) {
        var name = p[lang] ? p[lang].item : p.en.item;
        return name.toLowerCase().includes(q);
    });
    searchResults.innerHTML = hits.length
        ? hits.map(function (p) {
            var name = p[lang] ? p[lang].item : p.en.item;
            return '<a href="orderPage.html?id=' + p.id + '" class="search-result-item">' +
                   '<img src="' + p.img + '" alt="' + p.alt + '">' +
                   '<div class="result-info"><h4>' + name + '</h4><span class="result-price">$' + p.price.toFixed(2) + '</span></div>' +
                   '<i class="ri-arrow-right-s-line"></i></a>';
          }).join('')
        : '<p class="no-results">No results for "' + q + '"</p>';
};

// ── Global Escape ──────────────────────────────────────────────────────
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        searchOverlay.classList.remove('active');
        try { loginDialog.close(); } catch (_) {}
        document.getElementById('confirmOverlay').classList.remove('active');
    }
});

// ── Init ───────────────────────────────────────────────────────────────
refreshSummary();
