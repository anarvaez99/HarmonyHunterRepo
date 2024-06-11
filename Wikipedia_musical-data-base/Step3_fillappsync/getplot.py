import requests
from bs4 import BeautifulSoup
import re
import nlpcloud

client = nlpcloud.Client("bart-large-cnn", "nlpcloudkey")

def generate_summary(plot):
    response  = client.summarization(plot)
    return response['summary_text']

def get_plot(url):
    # Fetch the webpage content
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the plot section
    plot_section = soup.find('span', {'id': 'Plot'})
    if plot_section is None:
        # If there's no 'Plot' section, try 'Synopsis'
        plot_section = soup.find('span', {'id': 'Synopsis'})

        if plot_section is None:
            # Try 'Plot Synopsis'
            plot_section = soup.find('span', {'id': 'Plot_synopsis'})

            if plot_section is None:
                # Try 'Premise'
                plot_section = soup.find('span', {'id': 'Premise'})


    # If still not found, return an error message
    if plot_section is None:
        return None

    # Find all paragraphs under the plot section until the next section
    plot_paragraphs = plot_section.find_all_next(['p', 'h2'])

    plot_text = ""

    # Extract text from each paragraph and join them into a single paragraph
    for item in plot_paragraphs:
        if item.name == 'h2':
            break
        if item.name == 'p':
            # Remove reference links like [2]
            paragraph_text = re.sub(r'\[\d+\]', '', item.text.strip())
            # Remove text within parentheses
            paragraph_text = re.sub(r'\([^)]*\)', '', paragraph_text)
            plot_text += paragraph_text + " "  # Add space between paragraphs

    return plot_text.strip()



# Example usage:
def get_link_for_plot (link):
    plot_text = get_plot(link)
    summary_text = None
    if plot_text != None:
        summary_text = generate_summary(plot_text)

    return summary_text


