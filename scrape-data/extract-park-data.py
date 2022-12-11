'''
requires file named wikipedia-article.html, from source
https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States
downloaded on December 10, 2022
'''

from bs4 import BeautifulSoup
import json

article_file = open('wikipedia-article.html', 'r')
html_text = article_file.read()
article_file.close()

soup = BeautifulSoup(html_text, 'html.parser')
table_rows = soup.find_all('table')[1].tbody.find_all('tr')
json_list = []

for row in table_rows:
    park = {}
    cells = row.find_all(recursive=False) # list of the 7 cells in that row

    # get name
    park['name'] = cells[0].text.replace('*', '').strip()

    # get location
    location = []
    location_strings = cells[2].find('span', class_='geo-dec').text.strip().split()
    cardinality_1 = location_strings[1][-1:]
    location.append(float(location_strings[1][:-2]) * (1 if cardinality_1 == 'E' else -1))
    cardinality_0 = location_strings[0][-1:]
    location.append(float(location_strings[0][:-2]) * (1 if cardinality_0 == 'N' else -1))
    park['location'] = location

    # get number of visitors
    visitors = int(cells[5].text.strip().replace(',', ''))
    park['visitors'] = visitors

    json_list.append(park)

json_str = json.dumps(json_list, indent=4)

json_file = open('./../src/national-parks.json', 'w')
json_file.write(json_str)
json_file.close()