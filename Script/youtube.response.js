if (!$response.body) $done({});

let obj;

try {
  obj = JSON.parse($response.body);
} catch {
  $done({});
}

// enable background playback
if (obj.playabilityStatus)
  obj.playabilityStatus.backgroundPlayback = { allowed: true };

// enable PiP
if (obj.playerConfig?.audioConfig)
  obj.playerConfig.audioConfig.backgroundable = true;

// remove ads
delete obj.playerAds;
delete obj.adPlacements;
delete obj.adSlots;

// remove promoted videos
if (obj.contents)
  obj.contents = JSON.parse(
    JSON.stringify(obj.contents).replace(/"promoted[A-Za-z]+":\{.*?\}/g, "")
  );

$done({ body: JSON.stringify(obj) });
