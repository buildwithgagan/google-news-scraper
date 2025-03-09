const puppeteer = require('puppeteer');
const { CustomError } = require('../utils/errors');

class NewsService {
    async searchNews(topic, cursor = 0) {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        try {
            const page = await browser.newPage();
            
            // Set user agent
            await page.setUserAgent(process.env.USER_AGENT);
            
            // Construct URL with pagination
            const url = `https://www.google.com/search?q=${encodeURIComponent(topic)}&tbm=nws&start=${cursor}`;
            
            await page.goto(url, { waitUntil: 'networkidle0' });

            const articles = await page.evaluate(() => {
                const results = [];
                const articleElements = document.querySelectorAll('div.SoaBEf');

                articleElements.forEach(article => {
                    const titleElement = article.querySelector('.n0jPhd');
                    const linkElement = article.querySelector('a');
                    const snippetElement = article.querySelector('.GI74Re');
                    const sourceElement = article.querySelector('.MgUUmf');
                    const timeElement = article.querySelector('.ZE0LJd');
                    const imageElement = article.querySelector('img');

                    if (titleElement && linkElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            link: linkElement.href,
                            snippet: snippetElement ? snippetElement.textContent.trim() : '',
                            source: sourceElement ? sourceElement.textContent.trim() : '',
                            published_time: timeElement ? timeElement.textContent.trim() : '',
                            image_url: imageElement ? imageElement.src : null,
                            author: null // Google News doesn't typically show authors in search results
                        });
                    }
                });

                return results;
            });

            const nextCursor = cursor + 10;

            return {
                topic,
                articles,
                nextCursor: articles.length === 10 ? nextCursor : null
            };

        } catch (error) {
            throw new CustomError('Failed to scrape news', 500);
        } finally {
            await browser.close();
        }
    }
}

module.exports = NewsService; 