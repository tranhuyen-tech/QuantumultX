let body = $response.body;

try {
let obj = JSON.parse(body);

if (obj.playabilityStatus) {
obj.playabilityStatus.backgroundPlayback = {allowed: true};
}

if (obj.playerConfig) {
obj.playerConfig.audioConfig = {backgroundable: true};
}

delete obj.adPlacements;
delete obj.playerAds;
delete obj.adSlots;

$done({body: JSON.stringify(obj)});

} catch(e) {
$done({body});
}
