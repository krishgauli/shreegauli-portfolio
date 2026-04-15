const h = require('https');

function checkPage(url) {
  return new Promise(resolve => {
    h.get(url, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        const scripts = d.match(/<script type="application\/ld\+json">[^<]+<\/script>/g) || [];
        const results = [];
        scripts.forEach((s, i) => {
          const json = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
          try {
            const obj = JSON.parse(json);
            const type = obj['@type'];
            let issues = [];
            
            // ProfessionalService missing properties
            if (type === 'ProfessionalService') {
              if (!obj.telephone) issues.push('missing telephone');
              if (!obj.email) issues.push('missing email');
            }
            
            // LocalBusiness type mismatch
            if (type === 'LocalBusiness') {
              issues.push('should use ProfessionalService not LocalBusiness');
            }
            
            // Check for duplicate @types across schemas
            results.push({ type, id: obj['@id'], issues });
          } catch(e) {
            results.push({ type: 'PARSE_ERROR', issues: [json.substring(0, 80)] });
          }
        });
        
        // Check for duplicate types
        const types = results.map(r => r.type);
        const dupes = types.filter((t, i) => types.indexOf(t) !== i);
        if (dupes.length) {
          results.push({ type: 'DUPLICATE_CHECK', issues: ['Duplicate types: ' + [...new Set(dupes)].join(', ')] });
        }
        
        resolve({ url, schemas: results.length, results: results.filter(r => r.issues.length > 0) });
      });
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

Promise.all([
  checkPage('https://www.shreegauli.com/'),
  checkPage('https://www.shreegauli.com/about'),
  checkPage('https://www.shreegauli.com/testimonials'),
  checkPage('https://www.shreegauli.com/services'),
  checkPage('https://www.shreegauli.com/blogs'),
]).then(results => {
  results.forEach(r => {
    console.log('\n' + r.url + ' (' + r.schemas + ' schemas)');
    if (r.results.length === 0) console.log('  No issues found');
    r.results.forEach(s => {
      console.log('  ' + s.type + (s.id ? ' ' + s.id : '') + ': ' + s.issues.join(', '));
    });
  });
});
