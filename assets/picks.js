(function () {
  var box = document.getElementById('picks');

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  }

  function isHttpUrl(value) {
    try {
      var u = new URL(value);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch (e) {
      return false;
    }
  }

  fetch('picks.json', { cache: 'no-cache' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var items = (data && Array.isArray(data.items)) ? data.items : [];
      var limit = parseInt(box.getAttribute('data-limit') || '0', 10);
      if (limit > 0) items = items.slice(0, limit);
      var updated = document.getElementById('picks-updated');
      if (updated && data && data.updated) updated.textContent = '最終更新：' + data.updated;
      box.textContent = '';
      if (items.length === 0) {
        box.appendChild(el('p', { 'class': 'muted' }, '現在、掲載準備中です。'));
        return;
      }
      items.forEach(function (item) {
        if (!item || !isHttpUrl(item.url)) return;
        var card = el('div', { 'class': 'pick' });
        if (item.image && isHttpUrl(item.image)) {
          var imgLink = el('a', { href: item.url, target: '_blank', rel: 'sponsored noopener' });
          imgLink.appendChild(el('img', { src: item.image, alt: item.title || '', loading: 'lazy' }));
          card.appendChild(imgLink);
        }
        card.appendChild(el('span', { 'class': 'tag' }, 'PR'));
        card.appendChild(el('strong', {}, item.title || '商品'));
        if (typeof item.price === 'number' && item.price > 0) {
          card.appendChild(el('span', { 'class': 'price' }, '¥' + item.price.toLocaleString('ja-JP') + '（掲載時）'));
        }
        if (item.comment) card.appendChild(el('span', { 'class': 'muted' }, item.comment));
        var meta = [item.shop, item.date ? item.date + ' 紹介' : ''].filter(Boolean).join('｜');
        if (meta) card.appendChild(el('span', { 'class': 'muted small' }, meta));
        var link = el('a', { 'class': 'buy', href: item.url, target: '_blank', rel: 'sponsored noopener' }, '楽天市場で見る');
        if (item.shop && !/rakuten/.test(item.url)) link.textContent = item.shop + 'で見る';
        card.appendChild(link);
        box.appendChild(card);
      });
    })
    .catch(function () {
      box.textContent = '';
      box.appendChild(el('p', { 'class': 'muted' }, 'アイテム一覧を読み込めませんでした。'));
    });
})();
