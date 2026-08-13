/***********************************
> ScriptName        Guzheng Master Unlock
> Description       Gia lap xac thuc hoa don Apple cho Guzheng Master
***********************************/

var responseData = JSON.parse($response.body);

// ========= CAU HINH GUZHENG MASTER ========= //
var productidmap = { 
  'com.sensornotes.guzhengmaster': ['guzheng', 'com.sensornotes.guzhengmaster.vipversion', 0], 
  'default': ['guzheng', 'com.sensornotes.guzhengmaster.vipversion', 0] 
};

// ========= PHAN XAC THUC HOA DON ========= //
var bundleId = responseData['receipt']['bundle_id'];
var mapping = productidmap[bundleId] || productidmap['default'];

var inapp = {
  'product_id': mapping[1],
  'quantity': '1',
  'expires_date': '2099-12-18 23:59:59 Etc/GMT',
  'expires_date_pst': '2099-12-18 23:59:59 America/Los_Angeles',
  'expires_date_ms': '4101292799000',
  'is_in_intro_offer_period': 'false',
  'transaction_id': '1000000000000000',
  'is_trial_period': 'false',
  'original_transaction_id': '1000000000000000',
  'purchase_date_ms': '1701734399000',
  'purchase_date': '2023-12-04 23:59:59 Etc/GMT',
  'purchase_date_pst': '2023-12-04 23:59:59 America/Los_Angeles',
  'original_purchase_date': '2023-12-04 23:59:59 Etc/GMT',
  'original_purchase_date_pst': '2023-12-04 23:59:59 America/Los_Angeles',
  'original_purchase_date_ms': '1701734399000',
  'in_app_ownership_type': 'PURCHASED',
  'web_order_line_item_id': '1000000000000000'
};

var renew = {
  'product_id': mapping[1],
  'original_transaction_id': '1000000000000000',
  'auto_renew_product_id': mapping[1],
  'auto_renew_status': '1'
};

responseData['latest_receipt_info'] = [inapp];
responseData['status'] = 0;
responseData['pending_renewal_info'] = [renew];
responseData['receipt']['in_app'] = [inapp];

$done({'body': JSON.stringify(responseData)});
