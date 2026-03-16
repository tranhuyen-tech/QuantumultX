let body = $response.body;

try {
  let obj = JSON.parse(body);

  function cleanAds(o) {
    if (!o || typeof o !== "object") return;

    delete o.adPlacements;
    delete o.playerAds;
    delete o.adSlots;
    delete o.adBreakHeartbeatParams;

    for (let k in o) cleanAds(o[k]);
  }

  cleanAds(obj);

  // enable background play
  if (obj?.playabilityStatus?.backgroundPlaybackConfig) {
    obj.playabilityStatus.backgroundPlaybackConfig.enabled = true;
  }

  // keep miniplayer (pip)
  if (obj?.miniplayerRenderer) {
    obj.miniplayerRenderer = obj.miniplayerRenderer;
  }

  body = JSON.stringify(obj);
} catch (e) {}

$done({ body });
