/************************************
 * 特定のキャンペーンを自動でON/OFFするためのスクリプト
 ************************************/

var CAMPAIGN_NAME = ''; // TODO: 現状は1つのキャンペーンのみ。複数キャンペーンにする場合は配列化するように調整が必要
var TARGET_URL = ''; // 判別する文字列が存在するURL
var TARGET_TEXTS = [ //複数の文言設定可能
  '在庫なし',
  '在庫無し',
  '停止中',
];
var MAIL_TO = ''; // 通知したいメールアドレス
var MAIL_CC = ''; // 通知したいメールアドレス（CC）
var MAIL_ON_SUBJECT = '【テスト】リスティング自動設定オン';
var MAIL_OFF_SUBJECT = '【テスト】リスティング自動設定オフ';


/**
 * メイン処理
 */
function main() {
  var ads = AdsApp.campaigns().get();
  while (ads.hasNext()) {
    var ad = ads.next();
    if (ad.getName() === CAMPAIGN_NAME) {
      Logger.log('campaign name: ' + ad.getName());
      switchStatus(ad);
    }
  }
}


/**
 * ステータスを更新
 * ステータスに変化があった場合のみメール送信
 * @param {object} ad
 */
function switchStatus(ad) {
  // 一時停止
  if (isOutOfStock()) {
    if (ad.isEnabled()) {
      Logger.log('リスティング一時停止');
      sendEmail(MAIL_OFF_SUBJECT, 'リスティングが一時停止されました。\r\n対象のキャンペーン: ' + CAMPAIGN_NAME);
    }
    ad.pause();
    return;
  }
  
  // 開始
  if (!ad.isEnabled()) {
    Logger.log('リスティング開始');
    sendEmail(MAIL_ON_SUBJECT, 'リスティングが開始されました。\r\n対象のキャンペーン: ' + CAMPAIGN_NAME);
  }
  ad.enable();
}


/**
 * 在庫なしかチェック
 * return {bool} 在庫なしならtrue
 */
function isOutOfStock() {
  var html = UrlFetchApp.fetch(TARGET_URL).getContentText();
  var texts = TARGET_TEXTS;
  for (var i = 0; i< texts.length; i++) {
    if(html.indexOf(texts[i]) >= 0) {
      Logger.log('在庫なし');
      return true;
    }
  }
  Logger.log('在庫あり');
  return false;
}


/**
 * メール送信
 * @param {string} subject
 * @param {string} body
 */
function sendEmail(subject, body) {
  MailApp.sendEmail({
    to: MAIL_TO,
    cc: MAIL_CC,
    subject: subject,
    body: body,
  });
