// -----------------------------
//  メッセージの内容に応じた処理を行う
// -----------------------------

function handleMessage(userId, userMessage) {

  // 権限を確認し、許可リストに含まれていないユーザからのメッセージの場合は終了する
  let errorMessage = checkAuth(userId);
  if (errorMessage != '') {
    return errorMessage;
  }

  // トリガーメッセージが来た場合は、モードを設定する
  switch (userMessage) {

    // ユーザID確認の場合は、そのままユーザIDを返す
    case TRIGGER_MESSAGES.CHECK_USER_ID:
      return makeUserIdMessage(userId);
    
    // スケジュール確認の場合は、そのモードを設定
    case TRIGGER_MESSAGES.CHECK_SCHEDULE:
      setMode(MODE.CHECK_SCHEDULE);
      return makeConfirmMessage(MODE.CHECK_SCHEDULE);

    // スケジュール登録の場合は、そのモードを設定
    case TRIGGER_MESSAGES.REGISTER:
      setMode(MODE.REGISTER_DATE);
      return makeConfirmMessage(MODE.REGISTER_DATE);
    
    // スケジュール削除の場合は、そのモードを設定
    case TRIGGER_MESSAGES.DELETE:
      setMode(MODE.DELETE_DATE);
      return makeConfirmMessage(MODE.DELETE_DATE);

  }

  // トリガーメッセージでない場合は、モードに応じた処理をする
  switch (getMode()) {

    // スケジュール確認モードの場合は、スケジュール確認結果を返す
    case MODE.CHECK_SCHEDULE:
      return makeScheduleMessage(userMessage);

    // スケジュール登録(日付モード)の場合は、次のモードへ遷移
    case MODE.REGISTER_DATE:
      return checkInputDate(userMessage);
    
    // スケジュール登録(開始時刻モード)の場合は、次のモードへ遷移
    case MODE.REGISTER_STARTTIME:
      return checkInputTime(userMessage);
    
    // スケジュール登録(終了時刻モード)の場合は、次のモードへ遷移
    case MODE.REGISTER_ENDTIME:
      return checkInputTime(userMessage);
    
    // スケジュール登録(件名モード)の場合は、次のモードへ遷移
    case MODE.REGISTER_TITLE:
      return processTitle(userMessage);
    
    // スケジュール登録(確認モード)の場合は、登録して終了
    case MODE.REGISTER_CONFIRM:
      return registerCalender(userMessage);
    
    // スケジュール削除(日付モード)の場合は、次のモードへ遷移
    case MODE.DELETE_DATE:
      return showDeleteTarget(userMessage);
    
    // スケジュール削除(選択モード)の場合は、次のモードへ遷移
    case MODE.DELETE_SELECT:
      return selectDeleteEvent(userMessage);
    
    // スケジュール削除(確認モード)の場合は、削除して終了
    case MODE.DELETE_CONFIRM:
      return deleteCalender(userMessage);
      
  }
}


// -----------------------------
//  ユーザーID返却用の文字列作成
// -----------------------------

function makeUserIdMessage(userId) {

  // メッセージを整形
  let message = '';
  message = message + 'あなたのユーザIDはこちら\n';
  message = message + userId;

  return message

}

// -----------------------------
//  入力を促すメッセージを作成
// -----------------------------

function makeConfirmMessage(mode) {

  let message = '';
  switch (mode) {

    case MODE.CHECK_SCHEDULE:
      message = message + '確認したい日付を入力してください\n';
      message = message + '[形式] 1/1 または、 2021/1/1';
      return message;
    
    case MODE.REGISTER_DATE:      
      message = message + '予定を登録する日付を入力してください\n';
      message = message + '[形式] 1/1 または、 2021/1/1';
      return message;
    
    case MODE.REGISTER_STARTTIME:
      message = message + '開始時刻を入力してください\n';
      message = message + '[形式] 07:00';
      return message;
    
    case MODE.REGISTER_ENDTIME:
      message = message + '終了時刻を入力してください\n';
      message = message + '[形式] 09:00';
      return message;
    
    case MODE.REGISTER_TITLE:
      message = message + 'タイトルを入力してください';
      return message;
    
    case MODE.REGISTER_CONFIRM:
      message = message + '以下の予定を登録しますか？\n';
      message = message + '[日付] ' + getYear() + '/' + getMonth() + '/' + getDay() + '\n';
      message = message + '[時間] ' + getStartTime() + '-' + getEndTime() + '\n';
      message = message + '[件名] ' + getTitle();
      return message;
    
    case MODE.DELETE_DATE:
      message = message + '予定を削除する日付を入力してください\n';
      message = message + '[形式] 1/1 または、 2021/1/1';
      return message
    
    case MODE.DELETE_CONFIRM:
      let date = getYear() + '/' + getMonth() + '/' + getDay();
      message  = message + '以下の予定を削除しますか？\n';
      message  = message + getDayEventSchedule(date, getEventNo());
      return message;

  }

}

// -----------------------------
//  予定の確認結果を返す
// -----------------------------

function makeScheduleMessage(userMessage) {

  // 指定された値が日付形式であることをチェックする
  if (checkDateFormat(userMessage) == 0) {
    return '正しい日付の形式で入力してください'
  }

  return getDaySchedule(userMessage);

}

// -----------------------------
//  入力された日付をチェックし、次の処理に進ませる
// -----------------------------

function checkInputDate(userMessage) {

  // 入力された日付の形式が正しいかチェック
  if (checkDateFormat(userMessage) == 0) {
    return '入力された値の形式が正しくありません';
  }

  // 入力された値をキャッシュに乗せる
  let date = strToDate(userMessage);
  setDate(date.getFullYear(), date.getMonth()+1, date.getDate());

  // モードを進める
  setMode(MODE.REGISTER_STARTTIME);
  
  return makeConfirmMessage(MODE.REGISTER_STARTTIME);
  
}

// -----------------------------
//  入力された時刻をチェックし、次の処理に進ませる
// -----------------------------

function checkInputTime(userMessage) {

  // 入力された日付の形式が正しいかチェック
  if (checkTimeFormat(userMessage) == 0) {
    return '入力された値の形式が正しくありません';
  }

  // モードに応じて、処理を変える
  switch (getMode()) {

    case MODE.REGISTER_STARTTIME:
      setStartTime(userMessage);
      setMode(MODE.REGISTER_ENDTIME);
      return makeConfirmMessage(MODE.REGISTER_ENDTIME);
    
    case MODE.REGISTER_ENDTIME:
      setEndTime(userMessage);
      setMode(MODE.REGISTER_TITLE);
      return makeConfirmMessage(MODE.REGISTER_TITLE);

  }
}

// -----------------------------
//  入力された件名を保存し、次の処理に進ませる
// -----------------------------

function processTitle(userMessage) {
  
  setTitle(userMessage);
  setMode(MODE.REGISTER_CONFIRM);
  return makeConfirmMessage(MODE.REGISTER_CONFIRM);

}

// -----------------------------
//  カレンダーに登録する
// -----------------------------

function registerCalender(userMessage) {

  // YesNoになっているかチェック
  let options = ['Yes', 'No'];
  if (options.indexOf(userMessage) == -1) {
    return 'YesまたはNoで回答してください'
  }

  // Noの場合はモードをもとに戻す
  if (userMessage == 'No') {
    setMode(MODE.NOTHING);
    return '処理をキャンセルしました'
  }

  // Yesの場合は登録する
  setMode(MODE.NOTHING);
  return registerSchedule();

}

// -----------------------------
//  削除対象のイベントリスト作成
// -----------------------------

function showDeleteTarget(userMessage) {

  // 指定された値が日付形式であることをチェックする
  if (checkDateFormat(userMessage) == 0) {
    return '正しい日付の形式で入力してください'
  }

  // イベントを検索する
  let message = getDaySchedule(userMessage, Boolean('true'));

  // 検索結果が存在する場合 (キャッシュが0件でない場合)は、モードを進める。
  if (getEventsNum() != '0') {
    setMode(MODE.DELETE_SELECT);
  }

  return message;
}

// -----------------------------
//  選択された番号に応じた削除メッセージ作成
// -----------------------------

function selectDeleteEvent(userMessage) {

  setEventNo(userMessage);
  setMode(MODE.DELETE_CONFIRM);
  return makeConfirmMessage(MODE.DELETE_CONFIRM);

}

// -----------------------------
//  カレンダーから削除する
// -----------------------------

function deleteCalender(userMessage) {

  // YesNoになっているかチェック
  let options = ['Yes', 'No'];
  if (options.indexOf(userMessage) == -1) {
    return 'YesまたはNoで回答してください'
  }

  // Noの場合はモードをもとに戻す
  if (userMessage == 'No') {
    setMode(MODE.NOTHING);
    return '処理をキャンセルしました'
  }

  // Yesの場合は登録する
  setMode(MODE.NOTHING);
  return deleteSchedule();

}