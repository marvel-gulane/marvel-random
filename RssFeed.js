// rss.js — fetch & parse any RSS/Atom feed
// Usage: node rss.js <url> [limit]

const url = process.argv[2];
const limit = parseInt(process.argv[3]) || 10;

if (!url) {
  console.log('Usage: node rss.js <feed-url> [limit]');
  process.exit(1);
}

const res = await fetch(url, {
  headers: { 'User-Agent': 'NodeRSS/1.0' },
  signal: AbortSignal.timeout(10_000),
});

if (!res.ok) throw new Error(`HTTP ${res.status}`);

const xml = await res.text();

// Extract feed title
const title = xml.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? 'Unknown Feed';

// Extract items/entries
const items = [];
const re = /<item[^>]*>([\s\S]*?)<\/item>|<entry[^>]*>([\s\S]*?)<\/entry>/gi;
let m;
while ((m = re.exec(xml)) !== null) {
  const block = m[1];
  const get = (tag) =>
    block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      ?.trim() ?? '';

  items.push({
    title: get('title'),
    link: get('link'),
    date: get('pubDate') || get('dc:date') || get('updated'),
    desc: get('description').replace(/<[^>]*>/g, '').slice(0, 120),
  });
}

console.log(`\n  ${title}\n${'─'.repeat(50)}`);
items.slice(0, limit).forEach((it, i) => {
  console.log(`\n  ${i + 1}. ${it.title}`);
  if (it.date) console.log(`     ${it.date.slice(0, 16)}`);
  if (it.link) console.log(`     ${it.link}`);
  if (it.desc) console.log(`     ${it.desc}…`);
});
console.log(`\n  (${items.length} total items)\n`);   