document.addEventListener('DOMContentLoaded', () => {
    function initSearch() {
        const input = document.getElementById('searchInput');
        const form = document.getElementById('siteSearch');
        const sugg = document.getElementById('searchSuggestions');
        if (!input || !form || !sugg) {
            setTimeout(initSearch, 120);
            return;
        }

        const CATALOG = [
            // Categories
            'Bàn phím', 'Chuột', 'Lót chuột', 'Tai nghe', 'Micro', 'Mainboard',
            'CPU', 'VGA', 'Case', 'Nguồn', 'Tản nhiệt', 'Ổ cứng', 'SSD', 'HDD', 'RAM',
            'Loa', 'Webcam', 'Màn hình', 'Ghế', 'Bàn', 'Phần mềm', 'Router', 'Switch',
            'Handheld', 'Console', 'Phụ kiện', 'Máy in', 'Máy scan',
            // Popular terms
            'Bàn phím cơ', 'Keycap', 'Chuột gaming', 'Màn hình 144Hz', 'Tai nghe không dây',
            'SSD NVMe', 'RAM DDR5', 'Nguồn 750W', 'AIO 240',
        ];

        let outsideHandlerBound = false;

        function filterSuggestions(q) {
            const term = q.trim().toLowerCase();
            if (!term) return [];
            return CATALOG
                .filter(x => x.toLowerCase().includes(term))
                .slice(0, 8);
        }

        function hideSuggestions() {
            sugg.classList.remove('active');
            sugg.setAttribute('aria-hidden', 'true');
            sugg.innerHTML = '';
            if (outsideHandlerBound) {
                document.removeEventListener('click', outsideClickHandler);
                outsideHandlerBound = false;
            }
        }

        function outsideClickHandler(e) {
            if (!sugg.contains(e.target) && !form.contains(e.target)) {
                hideSuggestions();
            }
        }

        function showSuggestions(list) {
            if (!list.length) {
                hideSuggestions();
                return;
            }
            sugg.innerHTML = list
                .map(item => `<div class="sugg-item"><i class='bx bx-search'></i><span>${item}</span></div>`)
                .join('');
            sugg.classList.add('active');
            sugg.setAttribute('aria-hidden', 'false');
            if (!outsideHandlerBound) {
                setTimeout(() => {
                    document.addEventListener('click', outsideClickHandler);
                    outsideHandlerBound = true;
                }, 0);
            }

            Array.from(sugg.querySelectorAll('.sugg-item')).forEach(el => {
                el.addEventListener('click', () => {
                    const val = el.querySelector('span').textContent;
                    input.value = val;
                    form.requestSubmit();
                });
            });
        }

        input.addEventListener('input', () => {
            const list = filterSuggestions(input.value);
            showSuggestions(list);
        });

        input.addEventListener('focus', () => {
            const list = filterSuggestions(input.value);
            showSuggestions(list);
        });

        form.addEventListener('submit', (e) => {
            const q = input.value.trim();
            if (!q) {
                e.preventDefault();
                input.focus();
                return;
            }
            hideSuggestions();
            // Allow default GET submit to product.html?q=...
        });
    }

    initSearch();
});
