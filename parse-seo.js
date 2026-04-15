const fs = require('fs');
const csv = fs.readFileSync('/Users/focus/Desktop/App-FullStack/shreegauli-portfolio/shreegauli.com_mega_export_20260415.csv', 'utf8');
const lines = csv.trim().split('\n');
const headers = lines[0].split(',');
const issues = {};
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',');
  const url = cols[0];
  for (let j = 1; j < cols.length; j++) {
    const val = parseInt(cols[j]);
    if (val > 0) {
      const key = headers[j];
      if (!issues[key]) issues[key] = [];
      issues[key].push({url, count: val});
    }
  }
}
Object.entries(issues).sort((a,b) => b[1].length - a[1].length).forEach(([issue, pages]) => {
  console.log('\n=== ' + issue + ' (' + pages.length + ' pages) ===');
  pages.forEach(p => console.log('  ' + p.url + (p.count > 1 ? ' [x' + p.count + ']' : '')));
});
