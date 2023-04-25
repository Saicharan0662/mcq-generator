from bs4 import BeautifulSoup
import requests


class Scrapper(object):
    def __init__(self, link):
        self.link = link

    def get_scrapped_data(self):
        source = requests.get(self.link).text
        soup = BeautifulSoup(source, 'html.parser')
        p_tags_data_raw = soup.find_all('p')
        self.count = len(p_tags_data_raw)
        if self.count == 0:
            print("No data found")
            return None, None
        p_tags_data_raw.pop(0)

        for data in soup(['a', 'b']):
            data.decompose()

        self.p_tags_data = ' '.join(soup.stripped_strings)

        with open('content.txt', 'w', encoding="utf-8") as f:
            f.write(self.p_tags_data)

        with open('raw.txt', 'w', encoding="utf-8") as f:
            f.write(str(p_tags_data_raw))

        return self.p_tags_data, self.count
