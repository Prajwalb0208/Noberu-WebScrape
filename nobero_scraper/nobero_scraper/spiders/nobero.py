import scrapy
from nobero_scraper.items import NoberoScraperItem
import re

class NoberoSpider(scrapy.Spider):
    name = 'nobero'
    allowed_domains = ['nobero.com']
    start_urls = ['https://nobero.com/pages/men']

    def parse(self, response):
        # Extract all category URLs from the Men's section
        category_urls = response.css('a::attr(href)').getall()
        category_urls = [url for url in category_urls if '/collections/' in url]
        for url in category_urls:
            # Ensure URL is absolute
            if not url.startswith('http'):
                url = response.urljoin(url)
            yield scrapy.Request(url, callback=self.parse_category)

    def parse_category(self, response):
        # Extract all product URLs from the category page
        product_urls = response.css('section.product-card-container a::attr(href)').getall()
        for url in product_urls:
            # Ensure URL is absolute
            if not url.startswith('http'):
                url = response.urljoin(url)
            yield scrapy.Request(url, callback=self.parse_product)

        # Handle pagination if present
        next_page = response.css('a.pagination__next::attr(href)').get()
        if next_page:
            # Ensure URL is absolute
            if not next_page.startswith('http'):
                next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse_category)

    def parse_product(self, response):
        item = NoberoScraperItem()

        # Scrape product details with None checks
        item['category'] = self.extract_category(response)
        item['url'] = response.url
        item['title'] = self.extract_text(response.css('.w-full div h1::text'))
        item['price'] = self.extract_price(response.css('h2#variant-price spanclass::text'))
        item['MRP'] = self.extract_price(response.css('span#variant-compare-at-price spanclass::text'))
        item['last_7_day_sale'] = self.extract_text(response.css('.leading-\[0\.875rem\]::text'))
        item['available_skus'] = self.parse_skus(response)
        item['fit'] = self.extract_detail(response, 'Fit')
        item['fabric'] = self.extract_detail(response, 'Fabric')
        item['neck'] = self.extract_detail(response, 'Neck')
        item['sleeve'] = self.extract_detail(response, 'Sleeve')
        item['pattern'] = self.extract_detail(response, 'Pattern')
        item['length'] = self.extract_detail(response, 'Length')
        item['description'] = self.extract_description(response)

        yield item

    def extract_category(self, response):
        category = response.css('span.breadcrumb-category::text').get()
        return category.strip() if category else None


    def extract_text(self, selector):
        text = selector.get()
        if text:
            text = re.sub(r'\s+', ' ', text)
            return text.strip()
        return None


    def extract_price(self, selector):
        price_str = selector.get()
        if price_str:
            price_match = re.search(r'[\d,]+', price_str)
            if price_match:
                return int(price_match.group().replace(',', ''))
        return None

    def extract_detail(self, response, detail_name):
        details = response.css('.product-details p::text').getall()
        for detail in details:
            if detail_name in detail:
                return detail.strip().replace(detail_name + ':', '').strip()
        return None

    def extract_description(self, response):
        description = "\n".join(response.css('.product-description p span::text').getall())
        return description.strip() if description else None

    def parse_skus(self, response):
        skus = []
        colors = response.css('div.color-swatch a::attr(data-color-name)').getall()
        sizes = response.css('div.size-swatch input::attr(value)').getall()

        for color in colors:
            sku = {
                'color': color.strip(),
                'size': sizes if sizes else []
            }
            skus.append(sku)
        return skus