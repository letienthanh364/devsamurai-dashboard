import { DatabaseFields } from "../_commons/database.type";

export type UserAuthorityGroupType = "user" | "admin" | "superadmin";

export interface User extends DatabaseFields {
  name: string;
  email: string;
  authority_group: UserAuthorityGroupType;
}
