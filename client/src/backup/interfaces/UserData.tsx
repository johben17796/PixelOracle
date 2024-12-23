import { RawgData } from "./RawgData";

export interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  favorites: Array<RawgData>;
}
