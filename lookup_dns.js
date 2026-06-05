import dns from 'dns';

function lookup(domain, type) {
  return new Promise((resolve) => {
    dns.resolve(domain, type, (err, records) => {
      if (err) {
        resolve({ type, error: err.message });
      } else {
        resolve({ type, records });
      }
    });
  });
}

async function checkAll() {
  const domains = ['dzanalytica.com', 'www.dzanalytica.com'];
  for (const domain of domains) {
    console.log(`\n--- Checking ${domain} ---`);
    const a = await lookup(domain, 'A');
    console.log('A Records:', a);
    const cname = await lookup(domain, 'CNAME');
    console.log('CNAME Records:', cname);
  }
}

checkAll();
