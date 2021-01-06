// -----------------------------
//  メッセージをpushする
// -----------------------------

function push(userId, text) {

  let url = 'https://api.line.me/v2/bot/message/push';

  let headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CONSTANT.CHANNEL_ACCESS_TOKEN,
  };

  let postData = {
    'to': userId,
    'messages' : [
      {
        'type': 'text',
        'text': text,
      }
    ]
  };

  let options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}

// -----------------------------
//  確認ボタンをpushする
// -----------------------------

function pushConfirmButton(userId) {

  let url = 'https://api.line.me/v2/bot/message/push';

  let headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CONSTANT.CHANNEL_ACCESS_TOKEN,
  };

  let postData = {
    'to': userId,
    'messages' : [
      {
        "type"    : "template",
        "altText" : "YesNoボタン",
        "template": {
          "type": "buttons",
          "text": 'どちらか選択してください',
          "actions":[
            {
              "type" : "postback",
              "label": "Yes",
              'text' : 'Yes',
              "data" : 'Yes'
            },
            {
              "type" : "postback",
              "label": "No",
              'text' : 'No',
              "data" : 'No'
            }
          ]
        }
      }
    ]
  };

  let options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}


// -----------------------------
//  削除対象を選択させるクイックリプライ
// -----------------------------

function pushQuickReply(userId, num) {

  let url = 'https://api.line.me/v2/bot/message/push';

  let headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CONSTANT.CHANNEL_ACCESS_TOKEN,
  };

  let postData = {
    'to': userId,
    "messages": [
      {
        "type": "text",
        "text": "どの予定を削除しますか",
        "quickReply": {
          'items': makeItemsList(num)
        }
      }
    ]
  };

  let options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}


// -----------------------------
//  メッセージを送信したユーザが許可リストに含まれるか判定
// -----------------------------

function checkAuth(userId) {

  errorMessage = '';
  if (userIds.indexOf(userId) == -1) {
    errorMessage = errorMessage + 'あなたはこのbotの使用を許可されていません。\n';
    errorMessage = errorMessage + '管理者に問い合わせてください。'
  }

  return errorMessage;
}


// -----------------------------
//  日付形式の入力値になっているかをチェックし、
//  スラッシュの個数を返却する。
//  日付形式でない場合は、0を返却する。
// -----------------------------

function checkDateFormat(str) {

  // チェックする形式
  const exYMD = /(\d+)[\/](\d+)[\/](\d+)/;
  const exMD  = /(\d+)[\/](\d+)/;

  // チェック
  if (str.match(exYMD) != null) {
    return 2;
  } else if (str.match(exMD) != null) {
    return 1;
  } else {
    return 0
  }
}

// -----------------------------
//  時刻形式の入力値になっているかをチェックする。
//  時刻形式でない場合は、0を返却する。
// -----------------------------

function checkTimeFormat(str) {

  // チェックする形式
  const exMMDD = /(\d){2}[:](\d){2}/;

  // チェック
  if (str.match(exMMDD) != null) {
    return 1;
  } else {
    return 0;
  }
}


// -----------------------------
//  文字列型の日付をDate型に変換する
// -----------------------------

function strToDate(str) {

  // 形式をチェックし、スラッシュの個数を確認する
  let slashNum = checkDateFormat(str);

  // 文字列をスラッシュで分割し、月と日に分ける
  let strArray = str.split('/');
  let year, month, day;
  if (slashNum == 2) {
    year  = strArray[0];
    month = strArray[1];
    day   = strArray[2];
  } else {
    year  = '';
    month = strArray[0];
    day   = strArray[1];
  }

  // 年が入力されている場合はそのままの値を返却
  if (year != '') {
    return new Date(year, month-1, day);
  }

  // 年が入力されていない場合は、本日の日付と比較して、今年か来年を設定する
  let today = new Date();
  let y     = today.getFullYear();
  let m     = ("00" + (today.getMonth()+1)).slice(-2);
  let d     = today.getDate(); 

  if (month < m) {
    year = y + 1;
  } else if (month == m && day < d) {
    year = y + 1;
  } else {
    year = y;
  }

  return new Date(year, month-1, day);

}

// -----------------------------
//  quickReply用に、指定の数値までのitemリストを作る
// -----------------------------

function makeItemsList(num) {

  let items = [];
  for (let i = 1; i <= num; i++) {

    let dict = {
      'type'  : 'action',
      'action': {
        'type' : 'message',
        'label': i,
        'text' : i
      }
    }
    items.push(dict);

  }

  return items;
}