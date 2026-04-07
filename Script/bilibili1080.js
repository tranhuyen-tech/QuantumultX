/*
Tên：Bilibili Global (bilibili.tv) Full Script
Nguồn：Cuttlefish (ddgksf2013)
Tích hợp thư viện & Chuyển hệ Global: Assistant
Mục tiêu: Chặn quảng cáo, Mở khóa chất lượng 1080P/4K cho bản Global
*/

// --- TÍCH HỢP MAGICJS FULL VERSION (BẢN GỐC) ---
// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this.version="2.2.3.3",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=logLevel,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){this._barkUrl=url.replace(/\/+$/g,"")}set logLevel(level){this._logLevel="string"==typeof level?level.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"})}del(key,session=""){this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){if(this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)$notification.post(title,subTitle,body,opts);else if(this.isQuanX)$notify(title,subTitle,body,opts)}log(msg,level="INFO"){console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logError(msg){this.log(msg,"ERROR")}}()}

const scriptName = "BiliBiliGlobal";
let magicJS = MagicJS(scriptName, "INFO");

(() => {
  let body = null;
  if (magicJS.isResponse) {
    const url = magicJS.request.url;
    switch (true) {
      // 1. Chặn quảng cáo Feed (Trang chủ) Global
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/index\/feed/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          if (obj.data && obj.data.items) {
            obj.data.items = obj.data.items.filter(item => {
              // Giữ nguyên logic check quảng cáo từ script gốc
              if (item.hasOwnProperty("ad_info") || item.card_goto?.indexOf("ad") !== -1) return false;
              return true;
            });
          }
          body = JSON.stringify(obj);
        } catch (err) { magicJS.logError(`Feed Error: ${err}`); }
        break;

      // 2. Mở khóa 1080P & Tài khoản (MyInfo/Mine) Global
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/account\/(myinfo|mine)/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          if (obj.data) {
            // Mở khóa các quyền VIP cho bản Global
            obj.data.vip_type = 2;
            obj.data.vip_status = 1;
            if (obj.data.vip) {
                obj.data.vip.type = 2;
                obj.data.vip.status = 1;
                obj.data.vip.due_date = 4669824160;
            }
          }
          body = JSON.stringify(obj);
        } catch (err) { magicJS.logError(`Account Error: ${err}`); }
        break;

      // 3. Chặn quảng cáo tìm kiếm (Search Square) Global
      case /https:\/\/api\.bilibili\.tv\/intl\/gateway\/v2\/app\/search\/square/.test(url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj.data = { "type": "history", "title": "History", "search_hotword_revision": 2 };
          body = JSON.stringify(obj);
        } catch (err) { magicJS.logError(`Search Error: ${err}`); }
        break;
    }
    if (body) $done({ body });
    else $done({});
  }
})();
