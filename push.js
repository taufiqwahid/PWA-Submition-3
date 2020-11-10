var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BClgFMb1_DkSkvcWbTCgnunI1n5VEM6wS-5ReW__2I5D-4z-bK3S6ETHUQjIvSju56CJUmCLPGvc00_Xir6dpxY",
  privateKey: "EnbQJMOxEgx7XQA8AVJMd2tpS5t9pE2zDWTz8dKOiQs",
};

webPush.setVapidDetails(
  "mailto:taufiq.wahid58@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cMFSDKdiFC8:APA91bEYGfQ6eyy1kImycXKLKzHG_ru8MBySODxpFUcKswlpGRP7Uz5ztP9GcEsCt40Q58lrhmSSpiO9R6IEiUL1vlpDWWnZfc4Z7DskOH5FhpPpB8hn7tNnSnumxzwOy71i14hTsX4y",
  keys: {
    p256dh:
      "BGWZkpEXnd6hRxMordBSqoMerdH7A62pDWtrSqhBVOP3hyjidAaqGBTAkCzw4+Y9q37RPjqkZQVwinvWsU+JgrE=",
    auth: "T+Sxmq5CclUvNmm4HmIK6A==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi";

var options = {
  gcmAPIKey: "606998233508",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
