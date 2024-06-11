import csv
import getimage
import getmusicinfo
import getplot
import gettopics
import json
import requests

appsync_endpoint_url = 'https://somethingurl.com/graphql'
api_key = '12345'

def read_csv(filename):
    data = []
    with open(filename, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

filename = 'OtherAttempt/byparts.csv'
data = read_csv(filename)

for musical in data:
    
    musical_url = musical['WikiLink']
    music_name = musical['MusicalName']
    print(music_name)

    # Get Poster
    image_url = getimage.get_url_for_image(musical_url)
    musical['PosterLink'] = image_url

    # Get Spotify Info
    album_link, track_names, total_duration = getmusicinfo.get_name_for_music(music_name)
    musical['SpotifyLink'] = album_link
    musical['TrackList'] = track_names
    musical['MusicDuration'] = total_duration

    # Get Summary
    plot_text = getplot.get_link_for_plot(musical_url)
    musical['MusicalSummary'] = plot_text

    # Get Topics
    topic_list = gettopics.get_link_for_topics(musical_url)
    musical['MusicalTopics'] = topic_list

    musical['SearchType'] = 'Film'


for item in data:
    item['TrackList'] = json.dumps(item['TrackList'])
    item['MusicalTopics'] = json.dumps(item['MusicalTopics'])
    mutation = '''
    mutation BroadwayMusicals($input: CreateBroadwayMusicalsInput!) {
        createBroadwayMusicals(input: $input) {
            id
        }
    }
    '''

    # updateOrkaSystemKpiProd(input: UpdateOrkaSystemKpiProdInput!): OrkaSystemKpiProd
    variables = {
        'input': item  # Use the 'item' dictionary as the insert data
    }

    # Create the GraphQL request payload
    payload = {
        'query': mutation,
        'variables': variables
    }

    # Set the API Key as a header
    headers = {
        'x-api-key': api_key
    }
            
    # Make a POST request to the AppSync API
    response = requests.post(appsync_endpoint_url, json=payload, headers=headers)

    # Check the response status and content
    if response.status_code == 200:
        print("Data inserted successfully!")
        print(response.json())
    else:
        print("Failed to insert data. Status code:", response.status_code)
        print(response.text)

