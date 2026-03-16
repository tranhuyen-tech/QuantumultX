let body = $request.body;

try {
  let obj = JSON.parse(body);

  if (obj.context?.client) {
    obj.context.client.clientName = "ANDROID";
    obj.context.client.clientVersion = "19.09.37";
  }

  body = JSON.stringify(obj);
} catch (e) {}

$done({ body });
