let body = $request.body;

try {
let obj = JSON.parse(body);

if (obj.contentPlaybackContext) {
delete obj.contentPlaybackContext.adPlaybackContext;
}

$done({body: JSON.stringify(obj)});

} catch(e) {
$done({});
}
