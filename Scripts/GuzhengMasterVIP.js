if ($response.body) {
    try {
        let obj = JSON.parse($response.body);

        // Chỉ chạy khi đúng gói tin get_data_state
        if (obj && obj.action === "get_data_state") {

            // 1. Kích hoạt toàn bộ đặc quyền VIP & PRO
            if (obj.data && obj.data.inAppPurchase) {
                obj.data.inAppPurchase.isPro = true;
                obj.data.inAppPurchase.isVip = true;
                obj.data.inAppPurchase.isUnlockSong = true;
                obj.data.inAppPurchase.isActive = true;
                obj.data.inAppPurchase.isPriority = true;
            }

            // 2. Unlock toàn bộ item
            if (obj.data && obj.data.instruments) {
                obj.data.instruments.forEach(item => {
                    item.isLock = false;
                });
            }

        }

        // Trả về dữ liệu đã xử lý
        $done({body: JSON.stringify(obj)});

    } catch (e) {
        // Nếu lỗi (crash) trả về dữ liệu gốc
        $done({});
    }
} else {
    $done({});
}
