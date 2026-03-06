import { supabase } from '../supabase/client';

export interface LguOption {
  psgcCode: string;
  name: string;
  type: 'CITY' | 'MUNICIPALITY';
  regionCode: string;
  provinceCode: string | null;
  searchText: string;
}

let lguCache: LguOption[] | null = null;
let lguRequest: Promise<LguOption[]> | null = null;

const mapRowToOption = (row: {
  psgc_code: string;
  name: string;
  type: 'CITY' | 'MUNICIPALITY';
  region_code: string;
  province_code: string | null;
}): LguOption => ({
  psgcCode: row.psgc_code,
  name: row.name,
  type: row.type,
  regionCode: row.region_code,
  provinceCode: row.province_code,
  searchText: `${row.name} ${row.type}`.toLowerCase(),
});

export const fetchLguOptions = async (): Promise<LguOption[]> => {
  if (lguCache) {
    return lguCache;
  }

  if (lguRequest) {
    return lguRequest;
  }

  lguRequest = (async () => {
    const { data, error } = await supabase
      .from('lgus')
      .select('psgc_code, name, type, region_code, province_code')
      .eq('is_active', true)
      .in('type', ['CITY', 'MUNICIPALITY'])
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    const options = (data || []).map(mapRowToOption);
    lguCache = options;
    return options;
  })();

  try {
    return await lguRequest;
  } finally {
    lguRequest = null;
  }
};
