import Esubgroup from "./subgroup";

export default interface Ipair {
  number?: number;
  name?: string;
  teacher?: string;
  classroom?: string;
  subgroup?: Esubgroup;
  string?: string;
  changed?: boolean;
  removed?: boolean;
  error?: boolean;
}

export interface Itpair extends Ipair {
  group: string;
}
