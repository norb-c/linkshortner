export interface IURLAttributes {
  id?: number;
  short_key: string;
  original_url: string;
  deleted_flag?: boolean;
  deleted_at?: Date;
  created_at?: Date;
}
