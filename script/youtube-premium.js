// YouTube Premium unlock (2026 stable)

let obj;

try {
  obj = JSON.parse($response.body);
} catch {
  $done({});
}

// enable background playback
if (obj.playabilityStatus)
  obj.playabilityStatus.backgroundPlayback = { allowed: true };

// enable pip + background
if (obj.playerConfig)
  obj.playerConfig.audioConfig = { backgroundable: true };

// improve streaming stability
if (obj.streamingData)
  obj.streamingData.enableServerAbrStreaming = true;

// recursive ad cleaner
const clean = x => {
  if (!x || typeof x !== "object") return;

  for (let k in x) {
    if (/ad|ads|promoted|playerAds|adPlacements/i.test(k))
      delete x[k];
    else
      clean(x[k]);
  }
};

clean(obj);

$done({ body: JSON.stringify(obj) });
