/*
应用名称：Bilibili Global (bilibili.tv) Full Script
Gốc từ: Cuttlefish (ddgksf2013)
Tích hợp & Chuyển hệ Global: Assistant
Mục tiêu: Chặn quảng cáo, Mở khóa chất lượng 1080P/4K cho bản Global
*/

// --- THƯ VIỆN MAGICJS TÍCH HỢP ---
function MagicJS(n,e){const s="undefined"!=typeof $task,t="undefined"!=typeof $prefs,o="undefined"!=typeof $httpClient&&!s,r="function"==typeof silences;return new class{constructor(n,e){this.name=n,this.debug="DEBUG"==e,this.isRequest="undefined"!=typeof $request,this.isResponse="undefined"!=typeof $response,this.isSurge="undefined"!=typeof $httpClient&&!s,this.isQuanX=s,this.isLoon="undefined"!=typeof $loon,this.node=r}log(n){this.debug&&console.log(`[${this.name}] ${n}`)}logError(n){console.log(`[${this.name}] ERROR: ${n}`)}read(n){return this.isQuanX?$prefs.valueForKey(n):this.isSurge||this.isLoon?$persistentStore.read(n):void 0}write(n,e){return this.isQuanX?$prefs.setValueForKey(e,n):this.isSurge||this.isLoon?$persistentStore.write(e,n):void 0}get request(){return this.isRequest?$request:void 0}get response(){return this.isResponse?$response:void 0}done(n={}){$done(n)}}(n,e)}

const scriptName = "BiliBiliGlobal";
const storyAidKey = "bilibili_story_aid";
const blackKey = "bilibili_feed_black";
let magicJS = MagicJS(scriptName, "INFO");

let blacklist = [];
if (magicJS.read(blackKey)) {
  blacklist = magicJS.read(blackKey).split(";");
} else {
  const defaultList = "";
  magicJS.write(blackKey, defaultList);
  blacklist = defaultList.split(";");
}

(() => {
  let body = null;
  if (magicJS.isResponse) {
    const url = magicJS.request.url;
    switch (true) {
      // 1. Trang chủ (Feed) - Bản Global (api.bilibili.tv)
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/index\/feed/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let items = [];
          if (obj.data && obj.data.items) {
            for (let item of obj["data"]["items"]) {
              if (item.hasOwnProperty("banner_item")) {
                let bannerItems = [];
                for (let banner of item["banner_item"]) {
                  if (banner["type"] === "ad") continue;
                  else if (banner["static_banner"] && banner["static_banner"]["is_ad_loc"] != true) {
                    bannerItems.push(banner);
                  }
                }
                if (bannerItems.length >= 1) {
                  item["banner_item"] = bannerItems;
                  items.push(item);
                }
              } else if (
                !item.hasOwnProperty("ad_info") &&
                item.card_goto?.indexOf("ad") === -1 &&
                (item["card_type"] === "small_cover_v2" || item["card_type"] === "large_cover_v1")
              ) {
                items.push(item);
              }
            }
            obj["data"]["items"] = items;
          }
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`Feed Global Error: ${err}`);
        }
        break;

      // 2. Mở khóa 1080P/Thông tin tài khoản - Bản Global
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/account\/(myinfo|mine)/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          if (obj["data"]) {
            // Logic mở khóa VIP từ script gốc
            obj["data"]["vip_type"] = 2;
            obj["data"]["vip_status"] = 1;
            if (obj["data"]["vip"]) {
                obj["data"]["vip"]["type"] = 2;
                obj["data"]["vip"]["status"] = 1;
                obj["data"]["vip"]["due_date"] = 4669824160;
            }
          }
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`Account Global Error: ${err}`);
        }
        break;

      // 3. Chặn Hot Search/Square - Bản Global
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/search\/square/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj.data = { "type": "history", "title": "History", "search_hotword_revision": 2 };
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`Search Global Error: ${err}`);
        }
        break;
    }

    if (body) {
      $done({ body });
    } else {
      $done({});
    }
  }
})();
