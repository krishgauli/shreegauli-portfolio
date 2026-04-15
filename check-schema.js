const h = require('https');
h.get('https://www.shreegauli.com/about', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const scripts = d.match(/<script type="application\/ld\+json">[^<]+<\/script>/g) || [];
    scripts.forEach((s, i) => {
      const json = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      try {
        const obj = JSON.parse(json);
        console.log('Schema ' + i + ': @type=' + obj['@type'] + (obj['@id'] ? ' @id=' + obj['@id'] : ''));
        
        // Check BreadcrumbList
        if (obj['@type'] === 'BreadcrumbList' && obj.itemListElement) {
          obj.itemListElement.forEach((item, j) => {
            if (typeof item.item !== 'string' && typeof item.item !== 'object') {
              console.log('  WARNING: ListItem[' + j + '] missing item property');
            }
          });
        }
        
        // Check for missing required properties
        if (obj['@type'] === 'EducationalOccupationalCredential') {
          if (!obj.name) console.log('  ERROR: credential missing name');
        }

        // Check for known issues
        if (obj['@type'] === 'ProfessionalService') {
          if (!obj.telephone) console.log('  INFO: ProfessionalService missing telephone');
          if (!obj.openingHours) console.log('  INFO: ProfessionalService missing openingHours');
        }
        
        // Check aggregate rating
        if (obj['@type'] === 'LocalBusiness') {
          console.log('  WARNING: Using LocalBusiness for aggregate rating - should match ProfessionalService');
        }
        
      } catch(e) {
        console.log('Schema ' + i + ': PARSE ERROR - ' + json.substring(0, 100));
      }
    });
    console.log('\nTotal schemas: ' + scripts.length);
  });
});
