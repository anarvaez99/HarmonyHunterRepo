import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from datetime import timedelta

# Authenticate with Spotify API
client_credentials_manager = SpotifyClientCredentials(client_id='12345', client_secret='12345')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def search_album(album_name):
    # Search for the album
    results = sp.search(q=album_name, type='album')

    # Check if there are matching albums
    if results['albums']['items']:
        # Select the first matching album
        album = results['albums']['items'][0]
        
        # Retrieve album information
        album_name = album['name']
        artist = album['artists'][0]['name']
        album_link = album['external_urls']['spotify']
        
        # Retrieve album tracks
        tracks = sp.album_tracks(album['id'])
        
        # Display track listing
        track_names = [track['name'] for track in tracks['items']]
        
        # Calculate total duration
    
        total_duration_ms = sum([track['duration_ms'] for track in tracks['items']])
        total_seconds = total_duration_ms / 1000

        # Convert seconds to hours, minutes, and seconds
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        total_duration_formatted = "{:02}:{:02}".format(int(hours), int(minutes))
        return album_link, track_names, total_duration_formatted
        
    else:
        print("No matching albums found.")
        return None, None, None

def get_name_for_music(name_musical):
    namebroadway = name_musical
    album_link, track_names, total_duration = search_album(namebroadway)
    return album_link, track_names, total_duration


    