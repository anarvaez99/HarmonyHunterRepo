import requests
from bs4 import BeautifulSoup

def fetch_wikipedia_page(link):
    try:
        response = requests.get(link)
        if response.status_code == 200:
            return response.text
        else:
            print("Failed to fetch Wikipedia page. Status code:", response.status_code)
    except requests.exceptions.RequestException as e:
        print("Error fetching Wikipedia page:", e)

def save_as_html(content, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(content)

def main():
    # Link to the Wikipedia page
    # wikipedia_link = 'https://en.wikipedia.org/wiki/List_of_musicals:_A_to_L'
    wikipedia_link = 'https://en.wikipedia.org/wiki/List_of_musicals:_M_to_Z'
    # Fetching Wikipedia page content
    page_content = fetch_wikipedia_page(wikipedia_link)

    if page_content:
        # Converting Wikipedia content to HTML
        soup = BeautifulSoup(page_content, 'html.parser')
        html_content = soup.prettify()

        # Saving content as HTML file
        output_file = "wikipage2.html"  # You can specify your desired output file name here
        save_as_html(html_content, output_file)
        print(f"Page saved as {output_file}")
    else:
        print("Failed to fetch Wikipedia page content.")

if __name__ == "__main__":
    main()
