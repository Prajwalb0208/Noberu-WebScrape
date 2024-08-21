import scrapy
from nobero_scraper.items import NoberoScraperItem
import re

class NoberoSpider(scrapy.Spider):
    name = 'nobero'
    allowed_domains = ['nobero.com']
    start_urls = ['https://nobero.com/pages/men']

    def parse(self, response):
        # Extract category URLs from the Men's section in the specific div
        category_urls = response.css('div.custom-page-season-grid a::attr(href)').getall()
        category_urls = [url.strip() for url in category_urls if '/collections/' in url and 'men' in url]
        
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
        item['fit'] = self.extract_text(response.css('.lg\:text-base:nth-child(1) .font-normal::text'))
        item['fabric'] = self.extract_text(response.css('.lg\:text-base:nth-child(2) .font-normal::text'))
        item['neck'] = self.extract_text(response.css('.lg\:text-base:nth-child(3) .font-normal::text'))
        item['sleeve'] = self.extract_text(response.css('.lg\:text-base:nth-child(4) .font-normal::text'))
        item['pattern'] = self.extract_text(response.css('.lg\:text-base:nth-child(5) .font-normal::text'))
        item['length'] = self.extract_text(response.css('.lg\:text-base:nth-child(6) .font-normal::text'))
        item['description'] = self.extract_description(response)

        yield item

    def extract_category(self, response):
        # Extract category from breadcrumb span if available
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

    def extract_description(self, response):
        description = "\n".join(response.css('.product-description p span::text').getall())
        return description.strip() if description else None

    def parse_skus(self, response):
        available_skus = []
        color_labels = response.css('label.color-select')
        for color_label in color_labels:
            color_name = color_label.css('input::attr(value)').get().strip()
            sizes = []
            size_labels = response.css('label.size-select')
            for size_label in size_labels:
                size_value = size_label.css('input.size-select-input::attr(value)').get()
                if size_value and size_value.strip() not in sizes:
                    sizes.append(size_value.strip())
            available_skus.append({
                "color": color_name,
                "size": sizes
            })

        return available_skus


