let body = $response.body;

try {
let obj = JSON.parse(body);

// enable background
obj.playabilityStatus && (obj.playabilityStatus.backgroundPlayback = {allowed:true});

// enable pip
obj.playerConfig && (obj.playerConfig.audioConfig = {backgroundable:true});

// remove ads
delete obj.adPlacements;
delete obj.playerAds;
delete obj.adSlots;
delete obj.adBreakHeartbeatParams;
delete obj.adBreakParams;

$done({body:JSON.stringify(obj)});

} catch(e) {
$done({body});
}
