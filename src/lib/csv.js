export const toCSV = (arr, headers) => {
  const cols = headers || (arr[0] ? Object.keys(arr[0]) : []);
  const escape = (val) => {
    const v = val == null ? '' : String(val);
    if (v.includes(',') || v.includes('"') || v.includes('\n')) return '"' + v.replace(/"/g, '""') + '"';
    return v;
  };
  const headerLine = cols.join(',');
  const lines = arr.map((row) => cols.map((c) => escape(row[c])).join(','));
  return [headerLine, ...lines].join('\n');
};

export const fromCSV = (csvText) => {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  const parseLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes) {
        result.push(cur); cur = '';
      } else { cur += ch; }
    }
    result.push(cur);
    return result;
  };
  const rows = lines.slice(1).map(parseLine).map((vals) => Object.fromEntries(headers.map((h, i) => [h, (vals[i] || '').trim()])));
  return rows;
};
