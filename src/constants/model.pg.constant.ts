class PgModel {
  public static readonly USER_MODEL: string = 'tbl_users'
  public static readonly POST_MODEL: string = 'tbl_posts'
  public static readonly POST_COMMENT_MODEL: string = 'tbl_comments'
  public static readonly LIKE_MODEL: string = 'tbl_likes'
  public static readonly FOLLOW_MODEL: string = 'tbl_follows'
  public static readonly NOTIFICATION_MODEL: string = 'tbl_notifications'
  public static readonly MESSAGE_MODEL: string = 'tbl_messages'
  public static readonly POST_CATEGORY_MODEL: string = 'tbl_post_categories'
  public static readonly POST_TAG_MODEL: string = 'tbl_post_tags'
  public static readonly TAG_MODEL: string = 'tbl_tags'
  public static readonly POST_META_MODEL: string = 'tbl_post_metas'
  public static readonly CATEGORY_MODEL: string = 'tbl_categories'
}

export default PgModel