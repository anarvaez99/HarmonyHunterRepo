import json
import nltk
from nltk.corpus import wordnet
nltk.data.path.append("/tmp")
nltk.download("wordnet", download_dir="/tmp")

def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name())
    return synonyms

def word_similarity(word1, word2):
    synsets1 = wordnet.synsets(word1)
    synsets2 = wordnet.synsets(word2)
    if not synsets1 or not synsets2:
        return 0
    else:
        return max(s1.path_similarity(s2) for s1 in synsets1 for s2 in synsets2)

def find_most_related_word(input_word, word_list):
    max_similarity = -1
    most_related_word = None
    for word in word_list:
        similarity = word_similarity(input_word, word)
        if similarity > max_similarity:
            max_similarity = similarity
            most_related_word = word
    return most_related_word, max_similarity

def getsimilarword(items):
    word_list = ['Love', 'Friendship', 'Royal', 'Justice', 'Identity', 'Family', 'Adventure', 'Growth', 'Hope', 'History', 'Fantasy', 'Humor', 'Tragedy', 'Animal',
                 'Nature', 'Mythology', 'Diversity', 'Education', 'War', 'Art', 'Travel', 'Politics', 'Magic', 'School', 'Teenager', 'Sports', 'Fashion', 
                 'Crime', 'Survival', 'Dream', 'Fairytale', 'Time', 'Leadership', 'Celebration', 'Loneliness', 'Change', 'Faith', 'Forgiveness', 'Discovery', 
                 'Power', 'Pop', 'Rock', 'Rap', 'Classical', 'Dating', 'Summer', 'Winter', 'Fall', 'Spring', 'Disco', 'Book', 'Revolution', 'Freedom', 'Legacy', 
                 'Courage','Sacrifice', 'Revenge', 'Survival', 'Isolation', 'Passion', 'Pride', 'Reunion', 'Horror', 'God', 'Heaven', 'Hell', 'Work', 'Home']

    input_word = items['topic']
    most_related_word, similarity = find_most_related_word(input_word, word_list)
    print(f"Most related word to '{input_word}': {most_related_word} (Similarity: {similarity})")
    return most_related_word


def lambda_handler(event, context):
    payload = event['queryStringParameters']
    response = getsimilarword(payload)

    body = {
        'response': response
    }

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
            'Access-Control-Allow-Credentials': 'true'
        },
        'body': json.dumps(body)
    }