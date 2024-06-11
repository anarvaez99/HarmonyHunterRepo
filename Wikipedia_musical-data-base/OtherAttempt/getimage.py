import requests
from bs4 import BeautifulSoup

def get_image_url (response):
    if response.status_code == 200:
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        # Find all image tags
        image_tags = soup.find_all('img')
        # Search for an image with 'poster' in its filename
        found_poster = False
        for image_tag in image_tags:
            image_url = image_tag.get('src', '')
            if 'poster' in image_url.lower() or 'thumb' in image_url.lower():
                # Handle protocol-relative URL
                if image_url.startswith('//'):
                    image_url = 'https:' + image_url
                found_poster = True
                return image_url
        if not found_poster:
            print('No image with "poster" in its filename found on the page.')
            image_url = None
    else:
        print('Failed to fetch webpage.')
        image_url = None


# URL of the webpage
url = 'https://en.wikipedia.org/wiki/Mamma_Mia!_Here_We_Go_Again'

# Download the webpage
response = requests.get(url)

def get_url_for_image(url):
    response = requests.get(url)
    image_url = get_image_url(response)
    return image_url