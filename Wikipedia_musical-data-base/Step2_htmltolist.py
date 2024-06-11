from bs4 import BeautifulSoup
import csv

def filter_musiclas(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    rows = soup.find_all('tr')

    filtered_rows = []

    for row in rows[1:]:  # Exclude the header row
        cells = row.find_all('td')
        
        # Check if the row has enough cells
        if len(cells) >= 3:
            production = cells[0].get_text(strip=True)
            
            # Splitting Year values by commas
            years = cells[1].get_text(strip=True).split(',')
            
            # Iterating through individual Year values
            for year_str in years:
                try:
                    year = int(year_str.strip())
                    venue_type = cells[2].get_text(strip=True)
                    
                    # Check if the first cell contains a link
                    link_cell = cells[0].find('a')
                    if link_cell:
                        link = "https://en.wikipedia.org" + link_cell['href']
                    else:
                        link = None

                    if venue_type == "Broadway" and year > 1999:
                        musical_info = {
                            "Production": production,
                            "Year": year,
                            "Venue/type": venue_type,
                            "Music": cells[3].get_text(strip=True),
                            "Link": link
                        }
                        filtered_rows.append(musical_info)
                except ValueError:
                    print("Skipping invalid Year value:")
        else:
            print(production)
            print(year)
            print("Row skipped due to missing data:")

    return filtered_rows

def save_to_csv(data, csv_file):
    fieldnames = ["Production", "Year", "Venue/type", "Music", "Link"]
    with open(csv_file, 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

html_file = 'Data Base/wikipage2.html'
filtered_data = filter_musiclas(html_file)

if filtered_data:
    print("Productions on Broadway from 2000:")
    print(len(filtered_data))
    csv_file = "broadway_musicals.csv"
    save_to_csv(filtered_data, csv_file)
else:
    print("No data matching the criteria found in the HTML file.")


