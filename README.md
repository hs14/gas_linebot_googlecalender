# gas_linebot_googlecalender
Googleカレンダーと連携したスケジュール管理LineBot

Google Apps Script上に本リポジトリのファイルをコピーしてデプロイし、
LineBotのWebhookの設定をデプロイしたURLにすると、スケジュール管理できる。

Constant.gsにて個別設定は必要。

# 改修履歴
v1.0: 1つのGoogleカレンダーの予定を複数人に通知する仕組み。
v2.0: Line IDとGoogleカレンダーIDをマッピングし、各人のGoogleカレンダーを判別する。通知は全員にする仕組み。
