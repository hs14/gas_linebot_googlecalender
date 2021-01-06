// -----------------------------
//  カスタマイズが必要な変数
// -----------------------------

// アクセスキー
const CONSTANT = {
  CHANNEL_ACCESS_TOKEN: '{チャネルアクセストークン}',
  CALENDER_ID         : '{カレンダーID}'
};

// 送信先ユーザID (= 許可リスト)
const userIds = [
  '{ユーザID}',
  '{ユーザID}'
]

// トリガーとなるユーザからのメッセージ
const TRIGGER_MESSAGES = {
  CHECK_USER_ID : 'ユーザ情報を確認したい',
  CHECK_SCHEDULE: '予定を確認したい',
  REGISTER      : '予定を登録したい',
  DELETE        : '予定を削除したい',
}


// -----------------------------
//  固定値
// -----------------------------

// モード
const MODE = {
  NOTHING            : 'nothing',
  CHECK_SCHEDULE     : 'check_schedule',
  REGISTER_DATE      : 'register_date',
  REGISTER_STARTTIME : 'register_starttime',
  REGISTER_ENDTIME   : 'register_endtime',
  REGISTER_TITLE     : 'register_title',
  REGISTER_CONFIRM   : 'register_confirm',
  DELETE_DATE        : 'delete_date',
  DELETE_SELECT      : 'delete_select',
  DELETE_CONFIRM     : 'delete_confirm'
}

// Googleカレンダーオブジェクト
let myCalender = CalendarApp.getCalendarById(CONSTANT.CALENDER_ID);
