// -----------------------------
//  応答用のエントリーポイント
// -----------------------------

function doPost(e) {

  // 各種設定
  let url        = 'https://api.line.me/v2/bot/message/reply'; // 応答用APIのURL
  let event      = JSON.parse(e.postData.contents).events[0];  // 発生したイベント
  let replyToken = event.replyToken;                           // 返信するためのトークン

  // ユーザから送信されたメッセージに応じた処理を実行
  let userId      = event.source.userId;
  let userMessage = event.message.text;
  let message     = handleMessage(userId, userMessage);

  // ヘッダー
  let headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CONSTANT.CHANNEL_ACCESS_TOKEN,
  };

  // 送信データ
  let postData = {
    'replyToken': replyToken,
    'messages'  : [
      {
        'type': 'text',
        'text': message,
      }
    ]
  };

  // オプション
  let options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };

  // リクエスト送信
  let response = UrlFetchApp.fetch(url, options);

  // モードによっては確認ボタンやクイックリプライを送信
  if (getMode() == MODE.REGISTER_CONFIRM) {
    pushConfirmButton(userId);
  }
  if (getMode() == MODE.DELETE_SELECT) {
    pushQuickReply(userId, getEventsNum());
  }
  if (getMode() == MODE.DELETE_CONFIRM) {
    pushConfirmButton(userId);
  }
  
  // レスポンスコード200を固定値で返す (200を返すようにしないと動かない)
  return 200;
  
}
