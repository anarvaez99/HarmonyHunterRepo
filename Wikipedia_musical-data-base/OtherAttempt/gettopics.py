import requests
from bs4 import BeautifulSoup
import re
from collections import Counter
import nltk
from nltk.corpus import wordnet

nltk.download('wordnet')

def get_related_topics_from_url(page_url, movie_topics):
    try:
        # Fetch the HTML content of the Wikipedia page
        response = requests.get(page_url)
        if response.status_code == 200:
            html_content = response.text

            # Parse HTML content using BeautifulSoup
            soup = BeautifulSoup(html_content, 'html.parser')

            # Extract page title from the URL
            page_title = re.findall(r'/wiki/(.*)', page_url)[0].replace('_', ' ')

            # Find the content of the Wikipedia page
            content_div = soup.find('div', {'id': 'mw-content-text'})
            if content_div:
                # Extract text from the content div
                content = content_div.get_text()

                # Tokenize the content into words
                words = nltk.word_tokenize(content)

                # Lemmatize the words
                lemmatizer = nltk.WordNetLemmatizer()
                lemmatized_words = [lemmatizer.lemmatize(word.lower()) for word in words]

                # Get similar words for each movie topic
                similar_words = {}
                for topic in movie_topics:
                    similar_words[topic] = set()
                    synsets = wordnet.synsets(topic)
                    for synset in synsets:
                        for lemma in synset.lemmas():
                            similar_words[topic].add(lemma.name())

                # Count the occurrences of topics and similar words in the content
                topic_counts = Counter()
                for word in lemmatized_words:
                    for topic, similar_words_set in similar_words.items():
                        if word in similar_words_set:
                            topic_counts[topic] += 1

                # Sort the topics by their counts in descending order
                sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)

                return sorted_topics
            else:
                print("Content not found on the page.")

        else:
            print("Failed to fetch the Wikipedia page. Status code:", response.status_code)

    except Exception as e:
        print("Error:", e)


movie_topics = ['Love', 'Friendship', 'Royal', 'Justice', 'Identity', 'Family', 'Adventure', 'Growth', 'Hope', 'History', 'Fantasy', 'Humor', 'Tragedy',
                'Nature', 'Technology', 'Mythology', 'Diversity', 'Education', 'War', 'Art', 'Travel', 'Politics', 'Science', 'Magic', 'School', 'Teenager',
                'Sports', 'Fashion', 'Crime', 'Survival', 'Food', 'Dream', 'Work', 'Fairytale', 'Time', 'Leadership', 'Community', 'Celebration', 
                'Loneliness', 'Change', 'Faith', 'Rebellion', 'Forgiveness', 'Discovery', 'Power', 'Pop', 'Rock', 'Rap', 'Classical', 'America', 'Dating', 
                'Summer', 'Winter', 'Fall', 'Spring', 'Disco', 'Book', 'Revolution', 'Freedom', 'Legacy', 'Courage', 'sadness','Sacrifice', 'Revenge', 
                'Survival', 'Isolation', 'Pride', 'Anarchy', 'Reunion', 'America', 'Europe', 'Asia', 'God', 'Heaven', 'Hell', 'Work', 'Home']


def get_link_for_topics(page_url):
    related_topics = get_related_topics_from_url(page_url, movie_topics)
    top_10=related_topics[:10]

    # Sum up the counts of all topics
    total_count = sum(count for topic, count in top_10)

    # Calculate the percentage each topic contributes to the total count
    topic_percentages = {topic: (count / total_count) * 100 for topic, count in top_10}

    # Sort the topics by their percentages in descending order
    sorted_topic_percentages = sorted(topic_percentages.items(), key=lambda x: x[1], reverse=True)

    # Take the top 5 topics
    top_10_topics = sorted_topic_percentages[:10]

    # Normalize percentages to sum up to 100
    total_percentage = sum(percentage for topic, percentage in top_10_topics)
    remaining_percentage = 100 - total_percentage
    top_10_topics[-1] = (top_10_topics[-1][0], top_10_topics[-1][1] + remaining_percentage)

    # Format and print the result
    result = {topic: percentage for topic, percentage in top_10_topics}
    return result
