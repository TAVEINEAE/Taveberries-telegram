const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Токен бота (можно использовать для будущих запросов к Telegram Bot API)
const BOT_TOKEN = "8539575626:AAEPT8-pVxqOxKtQ919N61LkdseYcf6r57I";

if (tg.colorScheme === 'dark') {
  document.body.dataset.theme = 'dark';
}

let cart = [];

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
  document.getElementById('products').style.display = page === 'main' ? 'grid' : 'none';
  document.getElementById('cart-page').style.display = page === 'cart' ? 'block' : 'none';

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page === 'cart') updateCartUI();
}

// Товары
const productsData = [
  { id:1, name: "Букет 51 красная роза", price: 399, old: 599, img: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600" },
  { id:2, name: "Розы в коробке микс 25 шт", price: 249, old: 349, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d26?w=600" },
  { id:3, name: "Премиум орхидея в коробке", price: 179, img: "https://images.unsplash.com/photo-1610479577743-3e4d3c3c3e3c?w=600" },
  { id:4, name: "Нежный букет пионов", price: 449, old: 599, img: "https://images.unsplash.com/photo-1526045478516-99145907023c?w=600" },
  { id:5, name: "Букет 101 роза Эквадор", price: 899, old: 1299, img: "https://images.unsplash.com/photo-1562692500-5d1361d0a0c0?w=600" },
  { id:6, name: "Подарок: цветы + вино", price: 299, old: 399, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" }
];

const productsEl = document.getElementById('products');
productsData.forEach(p => {
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

// Навигация
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;
    if (page === 'catalog' || page === 'profile') {
      tg.showAlert(`Раздел "${page}" в разработке`);
    } else {
      showPage(page);
    }
  });
});

// Чек-аут (пока просто попап)
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

// Старт
showPage('main');
