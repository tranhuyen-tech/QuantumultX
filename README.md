# QuantumultX
Link liên kết Youtube cho QX: [Youtube Ads.conf](https://github.com/ddgksf2013/Rewrite/blob/master/AdBlock/YoutubeAds.conf)

Khi dùng script chính chủ

[MITM]
hostname = youtubei.googleapis.com

[Rewrite]

^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(player|browse|next|get_watch) 

url script-response-body 

https://raw.githubusercontent.com/tranhuyen-tech/QuantumultX/main/script/youtube-premium.js

Thêm Rule chặn video ads: (^https?:\/\/[\w-]+\.googlevideo\.com\/(?!dclk_video_ads).+?)&ctier=L(&.+?),ctier,(.+) url 302 $1$2$3
