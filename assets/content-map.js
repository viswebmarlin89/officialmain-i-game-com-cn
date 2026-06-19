// assets/content-map.js
// Site content sections, keyword tags and search filtering

/* Sections and tags configuration */
const siteContent = {
  baseUrl: 'https://officialmain-i-game.com.cn',
  mainKeyword: '爱游戏',
  sections: [
    {
      id: 'news',
      title: '新闻中心',
      keywords: ['爱游戏', '新闻', '行业动态', '游戏资讯'],
      items: [
        { title: '爱游戏平台更新公告', date: '2025-01-20' },
        { title: '2025新游发布计划', date: '2025-01-18' },
        { title: '玩家社区活动预告', date: '2025-01-15' }
      ]
    },
    {
      id: 'games',
      title: '游戏库',
      keywords: ['爱游戏', '游戏列表', '热门推荐', '休闲游戏'],
      items: [
        { title: '梦幻小镇', category: '模拟', rating: 4.5 },
        { title: '星际迷航', category: '策略', rating: 4.8 },
        { title: '欢乐消消乐', category: '休闲', rating: 4.3 }
      ]
    },
    {
      id: 'support',
      title: '客服支持',
      keywords: ['爱游戏', '帮助中心', 'FAQ', '账号问题'],
      items: [
        { title: '账号安全指南', type: 'faq' },
        { title: '充值问题解答', type: 'faq' }
      ]
    }
  ],
  tags: ['爱游戏', '手游', '网页游戏', '休闲娱乐', '社区']
};

/* Search filtering function */
function searchContent(query, content = siteContent) {
  const results = [];
  const q = query.toLowerCase().trim();
  
  if (!q) {
    return results;
  }

  // Search through sections
  for (const section of content.sections) {
    const sectionMatch = 
      section.title.toLowerCase().includes(q) ||
      section.keywords.some(kw => kw.toLowerCase().includes(q));
    
    if (sectionMatch) {
      results.push({
        type: 'section',
        id: section.id,
        title: section.title,
        matchField: 'section'
      });
    }

    // Search items within section
    for (const item of section.items) {
      const itemTitle = item.title.toLowerCase();
      if (itemTitle.includes(q)) {
        results.push({
          type: 'item',
          sectionId: section.id,
          sectionTitle: section.title,
          title: item.title,
          matchField: 'title'
        });
      }
    }
  }

  // Search tags
  for (const tag of content.tags) {
    if (tag.toLowerCase().includes(q)) {
      results.push({
        type: 'tag',
        value: tag,
        matchField: 'tag'
      });
    }
  }

  return results;
}

/* Filter items by keyword in a specific section */
function filterByKeyword(keyword, sectionId) {
  const section = siteContent.sections.find(s => s.id === sectionId);
  if (!section) {
    return [];
  }

  const kw = keyword.toLowerCase();
  return section.items.filter(item => {
    return item.title.toLowerCase().includes(kw) ||
      (item.category && item.category.toLowerCase().includes(kw));
  });
}

/* Utility: get all unique keywords across sections */
function getAllKeywords() {
  const keywordSet = new Set();
  for (const section of siteContent.sections) {
    for (const kw of section.keywords) {
      keywordSet.add(kw);
    }
  }
  for (const tag of siteContent.tags) {
    keywordSet.add(tag);
  }
  return Array.from(keywordSet);
}

/* Utility: count items per section */
function countItemsPerSection() {
  const counts = {};
  for (const section of siteContent.sections) {
    counts[section.id] = section.items.length;
  }
  return counts;
}

/* Example usage (uncomment to test in Node.js or browser) */
// console.log(searchContent('爱游戏'));
// console.log(filterByKeyword('休闲', 'games'));
// console.log(getAllKeywords());