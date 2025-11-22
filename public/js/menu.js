document.addEventListener("DOMContentLoaded", function () {
    const CATEGORY_SUBS = {
        "Bàn phím": ["Cơ - Mechanical", "Màng - Membrane", "Không dây", "Phụ kiện keycap"],
        "Chuột + Lót chuột": ["Chuột gaming", "Chuột văn phòng", "Lót chuột nhỏ", "Lót chuột lớn"],
        "Tai Nghe": ["Over-ear", "In-ear", "Wireless", "Mic tích hợp"],
        "Microphone": ["USB Mic", "XLR Mic", "Mic cài áo", "Sound card"],
        "Main, CPU, VGA": ["Mainboard", "CPU", "VGA / GPU", "Tản nhiệt"],
        "Case, Nguồn, Tản": ["Case Mid/Full", "PSU", "Fan Case", "AIO"],
        "Ổ cứng, RAM, Thẻ nhớ": ["SSD NVMe", "SSD SATA", "HDD", "RAM DDR4/DDR5"],
        "Loa, Micro, Webcam": ["Loa bluetooth", "Loa vi tính", "Webcam FullHD", "Webcam 4K"],
        "Màn hình": ["144Hz", "240Hz", "4K", "Ultrawide"],
        "Ghế - Bàn": ["Ghế công thái học", "Ghế gaming", "Bàn nâng hạ", "Phụ kiện"],
        "Phần mềm, mạng": ["Windows / Office", "Router", "Switch", "AP"],
        "Handheld, Console": ["Nintendo", "PlayStation", "Xbox", "Phụ kiện"],
        "Phụ kiện (Hub, sạc, cáp..)": ["Hub USB-C", "Sạc nhanh", "Cáp data", "Docking"],
        "Máy in, Scan": ["Máy in", "Máy scan", "Mực in", "Giấy in"],
        "Dịch vụ và thông tin khác": ["Bảo hành", "Lắp đặt", "Vệ sinh", "Cấu hình mẫu"],
    };

    function buildSubmenus(menuList) {
        const items = menuList.querySelectorAll("li");
        items.forEach(li => {
            if (li.querySelector('.submenu')) return;
            const name = li.dataset.cat || li.textContent.replace(/\s*›?\s*$/, '').trim();
            const subs = CATEGORY_SUBS[name] || [];
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            submenu.innerHTML = (subs.length)
                ? subs.map(s => `<a href="#">${s}</a>`).join('')
                : `<a href="#" style="pointer-events:none;color:#666">(Đang cập nhật)</a>`;
            li.appendChild(submenu);
        });
    }

    function setupMenu() {
        const menuToggle = document.getElementById("menuToggle");
        const menuList = document.getElementById("menuList");

        if (menuToggle && menuList) {
            console.log("🎯 Menu đã tìm thấy, gán sự kiện click.");

            menuToggle.addEventListener("click", function (event) {
                event.stopPropagation();
                menuList.classList.toggle("active");
                console.log("📂 Danh mục đã bật/tắt.");
            });

            document.addEventListener("click", function (event) {
                if (!menuToggle.contains(event.target) && !menuList.contains(event.target)) {
                    menuList.classList.remove("active");
                    console.log("❌ Danh mục bị đóng.");
                }
            });

            // Xây submenu hiển thị khi hover
            buildSubmenus(menuList);
        } else {
            console.warn("⚠️ Không tìm thấy menuToggle hoặc menuList!");
        }
    }

    function checkHeaderLoaded() {
        if (document.getElementById("menuToggle")) {
            setupMenu();
        } else {
            setTimeout(checkHeaderLoaded, 100); // Kiểm tra lại sau 100ms
        }
    }

    checkHeaderLoaded();
});
