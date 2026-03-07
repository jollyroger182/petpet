module 'bun' {
  interface Env {
    SLACK_SIGNING_SECRET: string
    SLACK_APP_TOKEN: string
    SLACK_BOT_TOKEN: string

    SLACK_XOXC_TOKEN: string
    SLACK_XOXD_TOKEN: string
  }
}
