const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Токен бота
const BOT_TOKEN = "8539575626:AAEPT8-pVxqOxKtQ919N61LkdseYcf6r57I";

// Адаптация темы
if (tg.colorScheme === 'dark') {
  document.body.dataset.theme = 'dark';
}

let cart = [];
let currentCategory = null;  // Для отслеживания текущей категории

// Массив продуктов (120+ разных, в 20 категориях)
const productsData = [
  { id:1, name: "Flowers Product 1", price: 1067, old: 1262, img: "https://picsum.photos/400/500?random=1", category: "Flowers" },
  { id:2, name: "Flowers Product 2", price: 1291, old: 1367, img: "https://picsum.photos/400/500?random=2", category: "Flowers" },
  { id:3, name: "Flowers Product 3", price: 1363, old: 1527, img: "https://picsum.photos/400/500?random=3", category: "Flowers" },
  { id:4, name: "Flowers Product 4", price: 960, old: 1321, img: "https://picsum.photos/400/500?random=4", category: "Flowers" },
  { id:5, name: "Flowers Product 5", price: 1446, old: 1865, img: "https://picsum.photos/400/500?random=5", category: "Flowers" },
  { id:6, name: "Flowers Product 6", price: 1448, old: null, img: "https://picsum.photos/400/500?random=6", category: "Flowers" },
  { id:7, name: "Clothing Product 1", price: 1303, old: 1549, img: "https://picsum.photos/400/500?random=7", category: "Clothing" },
  { id:8, name: "Clothing Product 2", price: 727, old: 1009, img: "https://picsum.photos/400/500?random=8", category: "Clothing" },
  { id:9, name: "Clothing Product 3", price: 376, old: null, img: "https://picsum.photos/400/500?random=9", category: "Clothing" },
  { id:10, name: "Clothing Product 4", price: 873, old: 1335, img: "https://picsum.photos/400/500?random=10", category: "Clothing" },
  { id:11, name: "Clothing Product 5", price: 1229, old: null, img: "https://picsum.photos/400/500?random=11", category: "Clothing" },
  { id:12, name: "Clothing Product 6", price: 799, old: null, img: "https://picsum.photos/400/500?random=12", category: "Clothing" },
  { id:13, name: "Electronics Product 1", price: 189, old: null, img: "https://picsum.photos/400/500?random=13", category: "Electronics" },
  { id:14, name: "Electronics Product 2", price: 1269, old: null, img: "https://picsum.photos/400/500?random=14", category: "Electronics" },
  { id:15, name: "Electronics Product 3", price: 853, old: 1067, img: "https://picsum.photos/400/500?random=15", category: "Electronics" },
  { id:16, name: "Electronics Product 4", price: 1256, old: null, img: "https://picsum.photos/400/500?random=16", category: "Electronics" },
  { id:17, name: "Electronics Product 5", price: 1095, old: null, img: "https://picsum.photos/400/500?random=17", category: "Electronics" },
  { id:18, name: "Electronics Product 6", price: 1423, old: 1495, img: "https://picsum.photos/400/500?random=18", category: "Electronics" },
  { id:19, name: "Books Product 1", price: 1319, old: null, img: "https://picsum.photos/400/500?random=19", category: "Books" },
  { id:20, name: "Books Product 2", price: 1139, old: null, img: "https://picsum.photos/400/500?random=20", category: "Books" },
  { id:21, name: "Books Product 3", price: 297, old: null, img: "https://picsum.photos/400/500?random=21", category: "Books" },
  { id:22, name: "Books Product 4", price: 733, old: null, img: "https://picsum.photos/400/500?random=22", category: "Books" },
  { id:23, name: "Books Product 5", price: 1132, old: 1154, img: "https://picsum.photos/400/500?random=23", category: "Books" },
  { id:24, name: "Books Product 6", price: 860, old: 1078, img: "https://picsum.photos/400/500?random=24", category: "Books" },
  { id:25, name: "Home & Kitchen Product 1", price: 1128, old: null, img: "https://picsum.photos/400/500?random=25", category: "Home & Kitchen" },
  { id:26, name: "Home & Kitchen Product 2", price: 1158, old: 1337, img: "https://picsum.photos/400/500?random=26", category: "Home & Kitchen" },
  { id:27, name: "Home & Kitchen Product 3", price: 1147, old: 1314, img: "https://picsum.photos/400/500?random=27", category: "Home & Kitchen" },
  { id:28, name: "Home & Kitchen Product 4", price: 1301, old: 1603, img: "https://picsum.photos/400/500?random=28", category: "Home & Kitchen" },
  { id:29, name: "Home & Kitchen Product 5", price: 682, old: null, img: "https://picsum.photos/400/500?random=29", category: "Home & Kitchen" },
  { id:30, name: "Home & Kitchen Product 6", price: 1415, old: 1428, img: "https://picsum.photos/400/500?random=30", category: "Home & Kitchen" },
  { id:31, name: "Beauty Product 1", price: 1043, old: null, img: "https://picsum.photos/400/500?random=31", category: "Beauty" },
  { id:32, name: "Beauty Product 2", price: 1271, old: null, img: "https://picsum.photos/400/500?random=32", category: "Beauty" },
  { id:33, name: "Beauty Product 3", price: 1111, old: 1591, img: "https://picsum.photos/400/500?random=33", category: "Beauty" },
  { id:34, name: "Beauty Product 4", price: 929, old: 1245, img: "https://picsum.photos/400/500?random=34", category: "Beauty" },
  { id:35, name: "Beauty Product 5", price: 817, old: null, img: "https://picsum.photos/400/500?random=35", category: "Beauty" },
  { id:36, name: "Beauty Product 6", price: 1137, old: 1374, img: "https://picsum.photos/400/500?random=36", category: "Beauty" },
  { id:37, name: "Sports Product 1", price: 1180, old: null, img: "https://picsum.photos/400/500?random=37", category: "Sports" },
  { id:38, name: "Sports Product 2", price: 1392, old: null, img: "https://picsum.photos/400/500?random=38", category: "Sports" },
  { id:39, name: "Sports Product 3", price: 1129, old: null, img: "https://picsum.photos/400/500?random=39", category: "Sports" },
  { id:40, name: "Sports Product 4", price: 119, old: 131, img: "https://picsum.photos/400/500?random=40", category: "Sports" },
  { id:41, name: "Sports Product 5", price: 877, old: null, img: "https://picsum.photos/400/500?random=41", category: "Sports" },
  { id:42, name: "Sports Product 6", price: 1021, old: 1475, img: "https://picsum.photos/400/500?random=42", category: "Sports" },
  { id:43, name: "Food Product 1", price: 891, old: 1244, img: "https://picsum.photos/400/500?random=43", category: "Food" },
  { id:44, name: "Food Product 2", price: 64, old: 68, img: "https://picsum.photos/400/500?random=44", category: "Food" },
  { id:45, name: "Food Product 3", price: 717, old: null, img: "https://picsum.photos/400/500?random=45", category: "Food" },
  { id:46, name: "Food Product 4", price: 628, old: null, img: "https://picsum.photos/400/500?random=46", category: "Food" },
  { id:47, name: "Food Product 5", price: 1413, old: null, img: "https://picsum.photos/400/500?random=47", category: "Food" },
  { id:48, name: "Food Product 6", price: 1359, old: 1391, img: "https://picsum.photos/400/500?random=48", category: "Food" },
  { id:49, name: "Toys Product 1", price: 159, old: null, img: "https://picsum.photos/400/500?random=49", category: "Toys" },
  { id:50, name: "Toys Product 2", price: 445, old: null, img: "https://picsum.photos/400/500?random=50", category: "Toys" },
  { id:51, name: "Toys Product 3", price: 430, old: null, img: "https://picsum.photos/400/500?random=51", category: "Toys" },
  { id:52, name: "Toys Product 4", price: 640, old: null, img: "https://picsum.photos/400/500?random=52", category: "Toys" },
  { id:53, name: "Toys Product 5", price: 863, old: 933, img: "https://picsum.photos/400/500?random=53", category: "Toys" },
  { id:54, name: "Toys Product 6", price: 59, old: 230, img: "https://picsum.photos/400/500?random=54", category: "Toys" },
  { id:55, name: "Automotive Product 1", price: 1402, old: 1416, img: "https://picsum.photos/400/500?random=55", category: "Automotive" },
  { id:56, name: "Automotive Product 2", price: 378, old: null, img: "https://picsum.photos/400/500?random=56", category: "Automotive" },
  { id:57, name: "Automotive Product 3", price: 1099, old: 1483, img: "https://picsum.photos/400/500?random=57", category: "Automotive" },
  { id:58, name: "Automotive Product 4", price: 245, old: null, img: "https://picsum.photos/400/500?random=58", category: "Automotive" },
  { id:59, name: "Automotive Product 5", price: 1352, old: 1381, img: "https://picsum.photos/400/500?random=59", category: "Automotive" },
  { id:60, name: "Automotive Product 6", price: 1043, old: null, img: "https://picsum.photos/400/500?random=60", category: "Automotive" },
  { id:61, name: "Jewelry Product 1", price: 595, old: 835, img: "https://picsum.photos/400/500?random=61", category: "Jewelry" },
  { id:62, name: "Jewelry Product 2", price: 859, old: null, img: "https://picsum.photos/400/500?random=62", category: "Jewelry" },
  { id:63, name: "Jewelry Product 3", price: 460, old: null, img: "https://picsum.photos/400/500?random=63", category: "Jewelry" },
  { id:64, name: "Jewelry Product 4", price: 666, old: null, img: "https://picsum.photos/400/500?random=64", category: "Jewelry" },
  { id:65, name: "Jewelry Product 5", price: 682, old: 1062, img: "https://picsum.photos/400/500?random=65", category: "Jewelry" },
  { id:66, name: "Jewelry Product 6", price: 395, old: null, img: "https://picsum.photos/400/500?random=66", category: "Jewelry" },
  { id:67, name: "Shoes Product 1", price: 735, old: 1048, img: "https://picsum.photos/400/500?random=67", category: "Shoes" },
  { id:68, name: "Shoes Product 2", price: 885, old: null, img: "https://picsum.photos/400/500?random=68", category: "Shoes" },
  { id:69, name: "Shoes Product 3", price: 1030, old: null, img: "https://picsum.photos/400/500?random=69", category: "Shoes" },
  { id:70, name: "Shoes Product 4", price: 1281, old: 1374, img: "https://picsum.photos/400/500?random=70", category: "Shoes" },
  { id:71, name: "Shoes Product 5", price: 1309, old: 1508, img: "https://picsum.photos/400/500?random=71", category: "Shoes" },
  { id:72, name: "Shoes Product 6", price: 1043, old: 1053, img: "https://picsum.photos/400/500?random=72", category: "Shoes" },
  { id:73, name: "Bags Product 1", price: 1229, old: 1548, img: "https://picsum.photos/400/500?random=73", category: "Bags" },
  { id:74, name: "Bags Product 2", price: 850, old: null, img: "https://picsum.photos/400/500?random=74", category: "Bags" },
  { id:75, name: "Bags Product 3", price: 990, old: null, img: "https://picsum.photos/400/500?random=75", category: "Bags" },
  { id:76, name: "Bags Product 4", price: 699, old: null, img: "https://picsum.photos/400/500?random=76", category: "Bags" },
  { id:77, name: "Bags Product 5", price: 1034, old: 1063, img: "https://picsum.photos/400/500?random=77", category: "Bags" },
  { id:78, name: "Bags Product 6", price: 422, old: null, img: "https://picsum.photos/400/500?random=78", category: "Bags" },
  { id:79, name: "Watches Product 1", price: 387, old: 835, img: "https://picsum.photos/400/500?random=79", category: "Watches" },
  { id:80, name: "Watches Product 2", price: 142, old: null, img: "https://picsum.photos/400/500?random=80", category: "Watches" },
  { id:81, name: "Watches Product 3", price: 1321, old: null, img: "https://picsum.photos/400/500?random=81", category: "Watches" },
  { id:82, name: "Watches Product 4", price: 1047, old: 1122, img: "https://picsum.photos/400/500?random=82", category: "Watches" },
  { id:83, name: "Watches Product 5", price: 673, old: 1080, img: "https://picsum.photos/400/500?random=83", category: "Watches" },
  { id:84, name: "Watches Product 6", price: 682, old: null, img: "https://picsum.photos/400/500?random=84", category: "Watches" },
  { id:85, name: "Furniture Product 1", price: 1094, old: null, img: "https://picsum.photos/400/500?random=85", category: "Furniture" },
  { id:86, name: "Furniture Product 2", price: 61, old: null, img: "https://picsum.photos/400/500?random=86", category: "Furniture" },
  { id:87, name: "Furniture Product 3", price: 1171, old: 1384, img: "https://picsum.photos/400/500?random=87", category: "Furniture" },
  { id:88, name: "Furniture Product 4", price: 999, old: 1217, img: "https://picsum.photos/400/500?random=88", category: "Furniture" },
  { id:89, name: "Furniture Product 5", price: 698, old: null, img: "https://picsum.photos/400/500?random=89", category: "Furniture" },
  { id:90, name: "Furniture Product 6", price: 1091, old: null, img: "https://picsum.photos/400/500?random=90", category: "Furniture" },
  { id:91, name: "Appliances Product 1", price: 648, old: 923, img: "https://picsum.photos/400/500?random=91", category: "Appliances" },
  { id:92, name: "Appliances Product 2", price: 694, old: null, img: "https://picsum.photos/400/500?random=92", category: "Appliances" },
  { id:93, name: "Appliances Product 3", price: 569, old: null, img: "https://picsum.photos/400/500?random=93", category: "Appliances" },
  { id:94, name: "Appliances Product 4", price: 1332, old: null, img: "https://picsum.photos/400/500?random=94", category: "Appliances" },
  { id:95, name: "Appliances Product 5", price: 412, old: null, img: "https://picsum.photos/400/500?random=95", category: "Appliances" },
  { id:96, name: "Appliances Product 6", price: 626, old: 999, img: "https://picsum.photos/400/500?random=96", category: "Appliances" },
  { id:97, name: "Tools Product 1", price: 843, old: 1261, img: "https://picsum.photos/400/500?random=97", category: "Tools" },
  { id:98, name: "Tools Product 2", price: 325, old: 613, img: "https://picsum.photos/400/500?random=98", category: "Tools" },
  { id:99, name: "Tools Product 3", price: 375, old: 711, img: "https://picsum.photos/400/500?random=99", category: "Tools" },
  { id:100, name: "Tools Product 4", price: 956, old: 1241, img: "https://picsum.photos/400/500?random=100", category: "Tools" },
  { id:101, name: "Tools Product 5", price: 620, old: null, img: "https://picsum.photos/400/500?random=101", category: "Tools" },
  { id:102, name: "Tools Product 6", price: 1390, old: null, img: "https://picsum.photos/400/500?random=102", category: "Tools" },
  { id:103, name: "Garden Product 1", price: 1377, old: null, img: "https://picsum.photos/400/500?random=103", category: "Garden" },
  { id:104, name: "Garden Product 2", price: 422, old: null, img: "https://picsum.photos/400/500?random=104", category: "Garden" },
  { id:105, name: "Garden Product 3", price: 265, old: 376, img: "https://picsum.photos/400/500?random=105", category: "Garden" },
  { id:106, name: "Garden Product 4", price: 482, old: null, img: "https://picsum.photos/400/500?random=106", category: "Garden" },
  { id:107, name: "Garden Product 5", price: 1182, old: null, img: "https://picsum.photos/400/500?random=107", category: "Garden" },
  { id:108, name: "Garden Product 6", price: 328, old: null, img: "https://picsum.photos/400/500?random=108", category: "Garden" },
  { id:109, name: "Pets Product 1", price: 1323, old: null, img: "https://picsum.photos/400/500?random=109", category: "Pets" },
  { id:110, name: "Pets Product 2", price: 1260, old: null, img: "https://picsum.photos/400/500?random=110", category: "Pets" },
  { id:111, name: "Pets Product 3", price: 360, old: null, img: "https://picsum.photos/400/500?random=111", category: "Pets" },
  { id:112, name: "Pets Product 4", price: 352, old: null, img: "https://picsum.photos/400/500?random=112", category: "Pets" },
  { id:113, name: "Pets Product 5", price: 110, old: 138, img: "https://picsum.photos/400/500?random=113", category: "Pets" },
  { id:114, name: "Pets Product 6", price: 252, old: null, img: "https://picsum.photos/400/500?random=114", category: "Pets" },
  { id:115, name: "Office Supplies Product 1", price: 160, old: null, img: "https://picsum.photos/400/500?random=115", category: "Office Supplies" },
  { id:116, name: "Office Supplies Product 2", price: 1341, old: 1745, img: "https://picsum.photos/400/500?random=116", category: "Office Supplies" },
  { id:117, name: "Office Supplies Product 3", price: 1454, old: 1456, img: "https://picsum.photos/400/500?random=117", category: "Office Supplies" },
  { id:118, name: "Office Supplies Product 4", price: 570, old: 573, img: "https://picsum.photos/400/500?random=118", category: "Office Supplies" },
  { id:119, name: "Office Supplies Product 5", price: 278, old: 548, img: "https://picsum.photos/400/500?random=119", category: "Office Supplies" },
  { id:120, name: "Office Supplies Product 6", price: 533, old: null, img: "https://picsum.photos/400/500?random=120", category: "Office Supplies" },
];

// Получить уникальные категории
const categories = [...new Set(productsData.map(p => p.category))];

// Отобразить категории в каталоге
const categoriesEl = document.getElementById('categories');
categories.forEach(cat => {
  const card = document.createElement('div');
  card.className = 'category-card';
  card.textContent = cat;
  card.onclick = () => showCategory(cat);
  categoriesEl.appendChild(card);
});

// Функция для показа продуктов (хиты или по категории/поиску)
function renderProducts(filteredProducts) {
  const productsEl = document.getElementById('products');
  productsEl.innerHTML = '';
  filteredProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img class="card-img" src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="price-row">
          <span class="price">${p.price} AED</span>
          ${p.old ? `<span class="old-price">${p.old} AED</span><span class="discount">-${Math.round((p.old - p.price)/p.old*100)}%</span>` : ''}
        </div>
        <button class="add-to-cart">В корзину</button>
      </div>
    `;
    card.querySelector('.add-to-cart').onclick = () => addToCart(p);
    productsEl.appendChild(card);
  });
}

function updateCartUI() {
  const count = cart.length;
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-badge').textContent = count;

  const itemsEl = document.getElementById('cart-items');
  itemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-img" src="${item.img}" alt="${item.name}">
      <div class="cart-info">
        <div style="font-weight:600">${item.name}</div>
        <div style="color:var(--accent);margin:4px 0">${item.price} AED</div>
        <small style="color:var(--hint)">1 × ${item.price} AED</small>
      </div>
      <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:var(--danger);font-size:24px;font-weight:bold">×</button>
    `;
    itemsEl.appendChild(div);
  });

  document.getElementById('cart-total').textContent = `Итого: ${total} AED`;
}

function addToCart(product) {
  cart.push(product);
  updateCartUI();
  tg.HapticFeedback.impactOccurred('medium');
  tg.showPopup({
    title: "Добавлено!",
    message: `${product.name}\n${product.price} AED`,
    buttons: [{type:"ok"}]
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function showPage(page) {
  const promo = document.getElementById('promo');
  const search = document.querySelector('.search');
  const titleEl = document.getElementById('section-title');
  document.getElementById('products').style.display = 'none';
  document.getElementById('catalog-page').style.display = 'none';
  document.getElementById('cart-page').style.display = 'none';

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page === 'main') {
    promo.style.display = 'block';
    search.style.display = 'block';
    titleEl.textContent = 'Хиты продаж';
    document.getElementById('products').style.display = 'grid';
    currentCategory = null;
    renderProducts(productsData.slice(0, 20));  // Хиты: первые 20
  } else if (page === 'catalog') {
    promo.style.display = 'none';
    search.style.display = 'block';
    document.getElementById('catalog-page').style.display = 'block';
  } else if (page === 'cart') {
    promo.style.display = 'none';
    search.style.display = 'none';
    document.getElementById('cart-page').style.display = 'block';
    updateCartUI();
  } else if (page === 'profile') {
    tg.showAlert('Личный кабинет в разработке');
  }
}

function showCategory(cat) {
  currentCategory = cat;
  document.getElementById('catalog-page').style.display = 'none';
  document.getElementById('products').style.display = 'grid';
  document.getElementById('section-title').textContent = `Каталог: ${cat}`;
  const filtered = productsData.filter(p => p.category === cat);
  renderProducts(filtered);
}

// Поиск (фильтрует текущий вид: хиты или категорию)
function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  let baseProducts = currentCategory 
    ? productsData.filter(p => p.category === currentCategory)
    : productsData.slice(0, 20);  // Если на главной — ищем в хитах

  const filtered = baseProducts.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

// Навигация
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    showPage(item.dataset.page);
  });
});

// Чек-аут
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    tg.showAlert("Корзина пуста");
  } else {
    tg.showPopup({
      title: "Оформление заказа",
      message: `Товаров: ${cart.length}\nСумма: ${cart.reduce((sum, item) => sum + item.price, 0)} AED\nПродолжить?`,
      buttons: [
        {type: "ok", text: "Да"},
        {type: "cancel"}
      ]
    });
  }
});

// Старт: главная
showPage('main');
