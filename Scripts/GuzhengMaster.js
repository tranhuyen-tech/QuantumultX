/*
Ứng dụng: Guzheng Master
Mục tiêu: Mở khóa PRO, VIP, Nhạc cụ và Đá quý qua API server riêng
Hỗ trợ công cụ: Quantumult X
*/

if ($response.body) {
    try {
        let obj = JSON.parse($response.body);
        
        // 1. Kích hoạt toàn bộ đặc quyền VIP & PRO
        if (obj.data && obj.data.inAppPurchase) {
            obj.data.inAppPurchase.isPro = true;
            obj.data.inAppPurchase.isVip = true;
            obj.data.inAppPurchase.isUnlockSong = true;
            obj.data.inAppPurchase.isActive = true;
            obj.data.inAppPurchase.isPriority = true;
        }
        
        // 2. Tự động mở khóa toàn bộ kho nhạc cụ
        if (obj.data && obj.data.instruments) {
            obj.data.instruments.forEach(item => {
                item.isLock = false;
            });
        }
        
        // 3. Tặng thêm số lượng đá quý để sử dụng tự do
        if (obj.data && obj.data.numJewels) {
            obj.data.numJewels = "99999";
        }
        
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // Nếu có lỗi phân tích JSON, trả về dữ liệu gốc để tránh lỗi mạng
        $done({});
    }
} else {
    $done({});
}
