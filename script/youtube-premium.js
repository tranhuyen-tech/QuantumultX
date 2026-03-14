// YouTube Premium unlock (2026 stable)

let body = $response.body;

try {

let obj = JSON.parse(body);

// enable background playback
if (obj.playabilityStatus) {
    obj.playabilityStatus.backgroundPlayback = { allowed: true };
}

// enable pip & background
if (obj.playerConfig) {
    obj.playerConfig.audioConfig = { backgroundable: true };
}

// premium flags
if (obj.responseContext) {
    obj.responseContext.serviceTrackingParams = obj.responseContext.serviceTrackingParams || [];
}

// player settings
if (obj.streamingData) {
    obj.streamingData.enableServerAbrStreaming = true;
}

// ad removal
if (obj.adPlacements) {
    delete obj.adPlacements;
}

if (obj.playerAds) {
    delete obj.playerAds;
}

if (obj.adSlots) {
    delete obj.adSlots;
}

$done({ body: JSON.stringify(obj) });

} catch (e) {

$done({ body });

}
