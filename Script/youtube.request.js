if (!$request.body) $done({});

let obj;

try {
  obj = JSON.parse($request.body);
} catch {
  $done({});
}

// remove ad signals
if (obj.context?.adSignalsInfo)
  delete obj.context.adSignalsInfo;

// remove ad placements
delete obj.adPlacements;
delete obj.playerAds;
delete obj.adSlots;

// disable ad request flags
if (obj.playbackContext)
  obj.playbackContext.contentPlaybackContext = {
    ...obj.playbackContext.contentPlaybackContext,
    adSignalsInfo: null
  };

$done({ body: JSON.stringify(obj) });
