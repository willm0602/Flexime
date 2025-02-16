import json
import csv

cities = []
with open('./cities.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        city = row['city_ascii']
        country = row['iso2']
        admin_name = row['admin_name']
        cities.append({
            'city': city,
            'countryCode': country,
            'region': admin_name
        })

cities_pretty = json.dumps(cities, indent=4)
with open('../../src/data/cities.json', 'w+') as file:
    file.write(cities_pretty)