// -----------------------------
//  カスタマイズが必要な変数
// -----------------------------

// アクセスキー
const CONSTANT = {
  CHANNEL_ACCESS_TOKEN: '{チャネルアクセストークン}'
};

// トリガーとなるユーザからのメッセージ
const TRIGGER_MESSAGES = {
  CHECK_USER_ID : 'ユーザ情報を確認したい',
  CHECK_SCHEDULE: '予定を確認したい',
  REGISTER      : '予定を登録したい',
  DELETE        : '予定を削除したい',
}

// ユーザIDとGoogleカレンダーIDのマッピング
const user_calender_map = {
  {LineユーザID}: CalendarApp.getCalendarById('{GoogleカレンダーID}'),
  {LineユーザID}: CalendarApp.getCalendarById('{GoogleカレンダーID}')
}

// ユーザIDと名前のマッピング
const user_name_map = {
  {LineユーザID}: '{名前}',
  {LineユーザID}: '{名前}'
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

// ユーザIDリスト
const allowed_id_list = Object.keys(user_calender_map)
