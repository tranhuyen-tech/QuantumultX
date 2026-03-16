// YouTube Premium unlock (2026 stable)

if (!$response.body) $done({});

let obj;

try {
  obj = JSON.parse($response.body);
} catch {
  $done({});
}

// Enable background playback
if (obj.playabilityStatus)
  obj.playabilityStatus.backgroundPlayback = { allowed: true };

// Enable PiP
if (obj.playerConfig?.audioConfig)
  obj.playerConfig.audioConfig.backgroundable = true;

// Remove ads (lightweight)
delete obj.playerAds;
delete obj.adPlacements;
delete obj.adSlots;

$done({ body: JSON.stringify(obj) });
