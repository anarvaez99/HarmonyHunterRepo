import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import csv
import ast
import json
import os

def read_csv_to_list(csv_file):
    data_list = []
    with open(csv_file, 'r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Convert the string representation of the dictionary to an actual dictionary
            row['MusicalTopics'] = ast.literal_eval(row['MusicalTopics'])
            data_list.append(row)
    return data_list

def recommend_similar_musicals(selected_musicals, num_recommendations=5):
    selected_indices = [musical_ids.index(musical) for musical in selected_musicals]
    selected_vectors = musical_vectors[selected_indices]
    
    # Calculate average of selected vectors
    avg_selected_vector = np.mean(selected_vectors, axis=0)
    
    # Calculate similarity scores with average vector
    similarity_scores = cosine_similarity([avg_selected_vector], musical_vectors).flatten()
    
    # Set similarity scores of selected musicals to -1 to exclude them
    for index in selected_indices:
        similarity_scores[index] = -1
    
    sorted_indices = np.argsort(similarity_scores)[::-1]  # Sort in descending order
    
    # Filter out the selected musicals from recommendations
    recommendations = [{'id': musical_ids[i], 'score': similarity_scores[i]} for i in sorted_indices if similarity_scores[i] != -1]
    
    return recommendations[:num_recommendations]

def getrecommendedmusicals(items):
    likedmusic = items ['liked_musicals']
    selected_musicals = ast.literal_eval(likedmusic)
    recommendations = recommend_similar_musicals(selected_musicals)
    print(recommendations)
    return recommendations

def lambda_handler(event, context):
    csv_file = os.path.join(os.path.dirname(__file__), 'MusicalTopics.csv')
    musicals_data = read_csv_to_list(csv_file)

    # Step 1: Create a unified list of all topics
    all_topics = set()
    for musical in musicals_data:
        all_topics.update(musical['MusicalTopics'].keys())
    all_topics = list(all_topics)

    # Step 2: Transform each musical's topics into a vector with zero padding
    def transform_topics(musical_topics, all_topics):
        vector = [0] * len(all_topics)
        for topic, score in musical_topics.items():
            index = all_topics.index(topic)
            vector[index] = score
        return vector

    global musical_ids
    musical_ids = [musical['id'] for musical in musicals_data]
    global musical_vectors
    musical_vectors = [transform_topics(musical['MusicalTopics'], all_topics) for musical in musicals_data]
    # Convert to numpy array for cosine similarity calculation
    musical_vectors = np.array(musical_vectors)
    
    payload = event['queryStringParameters']
    response = getrecommendedmusicals(payload)

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
