declare module '@geolonia/normalize-japanese-addresses' {
  export interface NormalizeResult {
    pref: string;
    city: string;
    town: string;
    addr: string;
    level: number;
  }
  
  export function normalize(address: string): Promise<NormalizeResult>;
}