const Cart = {
    key: 'wd-cart',
    load() {
        try { return JSON.parse(sessionStorage.getItem(this.key)) || {}; }
        catch { return {}; }
    },
    save(items) { sessionStorage.setItem(this.key, JSON.stringify(items)); },
    add(item, delta=1) { // 1. Accept the delta parameter
        const items = this.load();
        
        // 2. Use the delta instead of hardcoded +1
        items[item] = (items[item] || 0) + delta;

        // 3. Optional: Clean up items with 0 or negative quantity
        if (items[item] <= 0) {
            delete items[item];
        }

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
