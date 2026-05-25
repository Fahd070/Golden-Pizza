var i18n = {
    en: {
        orderNow: "Order Now",
        ourMenu: "Our Menu",
        customerReviews: "Customer Reviews",
        contactUs: "Contact us",
        orderNowFooter: "Order Now",
        reviewLink: "Review",
        emailLabel: "Email: goldenpizza@example.com",
        phoneLabel: "Phone: +1234567890",
        copyright: "© 2024 Golden Pizza. All rights reserved.",
        searchPlaceholder: "Search for a pizza...",
        orderBtn: "Order",
        breadHome: "Home",
        breadMenu: "Menu",
        chooseSize: "Choose Size",
        chooseCrust: "Choose Crust",
        extraToppings: "Extra Toppings",
        quantity: "Quantity",
        specialInstructions: "Special Instructions",
        specialInstructionsPlaceholder: "Any special requests? (e.g. no onions, extra crispy...)",
        sizeSmall: "Small",
        sizeMedium: "Medium",
        sizeLarge: "Large",
        sizeStandard: "Standard",
        crustClassic: "Classic",
        crustThin: "Thin & Crispy",
        crustThick: "Thick & Fluffy",
        extraCheese: "Extra Cheese",
        extraSauce: "Extra Sauce",
        extraMushrooms: "Mushrooms",
        extraJalapenos: "Jalapeños",
        extraOlives: "Olives",
        extraBellPeppers: "Bell Peppers",
        basePrice: "Base Price",
        sizeAdjustment: "Size Adjustment",
        extrasLabel: "Extras",
        quantityLabel: "Quantity",
        total: "Total",
        placeOrder: "Place Order 🍕",
        backToMenu: "← Back to Menu",
        orderPlaced: "Order Placed!",
        orderSuccess: "Your pizza is on its way. Thank you for choosing Golden Pizza!",
        backToMenuBtn: "Back to Menu",
        confirmSizeLabel: "📏 Size:",
        confirmCrustLabel: "🥖 Crust:",
        confirmExtrasLabel: "➕ Extras:",
        confirmNotesLabel: "📝 Notes:",
        confirmQtyLabel: "🔢 Quantity:",
        confirmTotalLabel: "💰 Total:",
        reviews: [
            { p: "The best pizza I've ever had! The crust was perfect and the toppings were fresh and flavorful.", name: "- Sarah K." },
            { p: "Golden Pizza never disappoints. Their variety of pizzas caters to all tastes, and the service is always top-notch.", name: "- Mike D." },
            { p: "I love their vegetarian options! The Veggie Delight pizza is my go-to choice. Highly recommend!", name: "- Emily R." }
        ]
    },
    ar: {
        orderNow: "اطلب الآن",
        ourMenu: "قائمتنا",
        customerReviews: "آراء العملاء",
        contactUs: "تواصل معنا",
        orderNowFooter: "اطلب الآن",
        reviewLink: "التقييمات",
        emailLabel: "البريد الإلكتروني: goldenpizza@example.com",
        phoneLabel: "الهاتف: +1234567890",
        copyright: "© 2024 بيتزا ذهبية. جميع الحقوق محفوظة.",
        searchPlaceholder: "ابحث عن بيتزاك...",
        orderBtn: "اطلب",
        breadHome: "الرئيسية",
        breadMenu: "القائمة",
        chooseSize: "اختر الحجم",
        chooseCrust: "اختر نوع العجينة",
        extraToppings: "إضافات",
        quantity: "الكمية",
        specialInstructions: "تعليمات خاصة",
        specialInstructionsPlaceholder: "أي طلبات خاصة؟ (مثال: بدون بصل، مقرمش أكثر...)",
        sizeSmall: "صغير",
        sizeMedium: "وسط",
        sizeLarge: "كبير",
        sizeStandard: "قياسي",
        crustClassic: "عجينة كلاسيك",
        crustThin: "رفيعة ومقرمشة",
        crustThick: "سميكة وطرية",
        extraCheese: "جبن إضافي",
        extraSauce: "صوص إضافي",
        extraMushrooms: "فطر",
        extraJalapenos: "هالابينيو",
        extraOlives: "زيتون",
        extraBellPeppers: "فلفل ملون",
        basePrice: "السعر الأساسي",
        sizeAdjustment: "تعديل الحجم",
        extrasLabel: "الإضافات",
        quantityLabel: "الكمية",
        total: "المجموع",
        placeOrder: "تأكيد الطلب 🍕",
        backToMenu: "العودة للقائمة ←",
        orderPlaced: "تم الطلب!",
        orderSuccess: "بيتزاك في الطريق إليك. شكراً لاختيارك بيتزا ذهبية!",
        backToMenuBtn: "العودة للقائمة",
        confirmSizeLabel: "📏 الحجم:",
        confirmCrustLabel: "🥖 العجينة:",
        confirmExtrasLabel: "➕ الإضافات:",
        confirmNotesLabel: "📝 ملاحظات:",
        confirmQtyLabel: "🔢 الكمية:",
        confirmTotalLabel: "💰 المجموع:",
        reviews: [
            { p: "أفضل بيتزا تناولتها في حياتي! كانت العجينة مثالية والإضافات طازجة ولذيذة.", name: "- سارة ك." },
            { p: "بيتزا ذهبية لا تخذل أبداً. تناسب أصنافهم جميع الأذواق والخدمة دائماً على أعلى مستوى.", name: "- مايك د." },
            { p: "أحب خياراتهم النباتية! بيتزا الخضار هي خياري المفضل دائماً. أنصح بها بشدة!", name: "- إيميلي ر." }
        ]
    }
};

var currentLang = localStorage.getItem('gp_lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gp_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations();
    var sel = document.getElementById('langSelect');
    if (sel) sel.value = lang;
}

function applyTranslations() {
    var t = i18n[currentLang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (t[key] !== undefined && typeof t[key] === 'string') el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });
}
