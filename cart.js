const Cart = {
    key: 'wd-cart',
    load() {
        try { return JSON.parse(sessionStorage.getItem(this.key)) || {}; }
        catch { return {}; }
    },
    save(items) { sessionStorage.setItem(this.key, JSON.stringify(items)); },
    add(item) {
        const items = this.load();
        items[item] = (items[item] || 0) + 1;
        this.save(items);
        this.renderTotal();
    },
    totalPence() {
        const items = this.load();
        return Object.entries(items)
                        .reduce((sum, [name, qty]) =>
                        sum + window.catalog[name].price * qty, 0);
    },
    renderTotal() {
        const el = document.getElementById('total');
        if (!el) return;               // page has no total line, nothing to do
        el.textContent = PriceToString(this.totalPence());
    },
    clear() {
        sessionStorage.removeItem(this.key);
        this.renderTotal();
    }
};

function PriceToString(p) { return "£" + (p / 100).toFixed(2); }
