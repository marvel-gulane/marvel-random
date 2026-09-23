// rss-news.js — fetch multiple news feeds in one run
// Usage: node rss-news.js [limit]

const FEEDS = [
  { name: 'Hacker News',       url: 'https://hnrss.org/frontpage' },
  { name: 'BBC News',          url: 'https://feeds.bbci.co.uk/news/rss.xml' },
  { name: 'Reuters',           url: 'https://www.rss.reuters.com' },
  { name: 'The Verge',         url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Ars Technica',      url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { name: 'TechCrunch',        url: 'https://techcrunch.com/feed/' },
  { name: 'Wired',             url: 'https://www.wired.com/feed/rss' },
  { name: 'NPR News',          url: 'https://feeds.npr.org/1001/rss.xml' },
  { name: 'The Guardian',      url: 'https://www.theguardian.com/world/rss' },
  { name: 'Al Jazeera',        url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  {name : 'BBC Asia', 		   url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml'},
  {name : 'CNA', 		   	   url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml'},
  {name : 'SCMP', 		       url: 'https://www.scmp.com/rss/3/rss.xml'},
  {name : 'Radio Free Asia',   url: 'https://www.rfa.org/english/feed/rss2.xml'},
  {name : 'The Diplomat', 	   url: 'https://thediplomat.com/feed/'},
  {name : 'East Asia Forum',   url: 'https://eastasiaforum.org/feed/'},
  {name : 'e27', 		       url: 'https://e27.co/feed/'},
  {name : 'Nikkei Asia', 	   url: 'https://asia.nikkei.com/rss/feed/nar'},
  {name : 'Manila Bulletin',   url: 'https://mb.com.ph/rss/'},
  {name : 'GMA News', 		   url: 'https://data.gmanews.tv/gno/rss/news/feed.xml'},
  {name : 'PhilStar News', 	   url: 'https://www.philstar.com/rss/headlines'},
  {name : 'Manila Standard',   url: 'https://manilastandard.net/feed/all'},
  {name : 'Business World',    url: 'https://www.bworldonline.com/feed/'},
  {name : 'Rappler News', 	   url: 'https://www.rappler.com/rss'},
  {name : 'Interaksyon TV5',   url: 'https://www.interaksyon.com/feed/'},
  {name : 'Current Ph', 	   url: 'https://currentph.com/feed/'},
  {name : 'Panay Island News', url: 'https://panaynews.net/feed'},

];

const limit = parseInt(process.argv[2]) || 5;

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'NodeRSS/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { name: feed.name, error: `HTTP ${res.status}`, items: [] };

    const xml = await res.text();
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
      });
    }
    return { name: feed.name, items: items.slice(0, limit) };
  } catch (e) {
    return { name: feed.name, error: e.message, items: [] };
  }
}

// ─── Run all feeds in parallel ─────────────────────────────────────
const results = await Promise.allSettled(FEEDS.map(fetchFeed));

let total = 0;
for (const r of results) {
  const { name, items, error } = r.value;
  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  📰 ${name}`);
  console.log('═'.repeat(56));

  if (error) {
    console.log(`  ⚠️  Failed: ${error}`);
    continue;
  }

  items.forEach((it, i) => {
    console.log(`\n  ${i + 1}. ${it.title}`);
    if (it.date) console.log(`     ${it.date.slice(0, 16)}`);
    if (it.link) console.log(`     ${it.link}`);
  });
  if (!items.length) console.log('  (no items found)');
  total += items.length;
}

console.log(`\n${'─'.repeat(56)}`);
console.log(`  ✅ ${total} items from ${results.filter(r => !r.value.error).length}/${FEEDS.length} feeds\n`);   
