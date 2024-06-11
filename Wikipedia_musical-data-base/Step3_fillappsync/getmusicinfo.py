import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import re

# Replace these with your Spotify API credentials
CLIENT_ID = '123456'
CLIENT_SECRET = '12345'

# Set up authentication
auth_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

def get_album_id_from_url(url):
    # Extract the album ID from the URL using regex
    match = re.match(r'https://open.spotify.com/album/([a-zA-Z0-9]+)', url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid Spotify album URL")

def get_album_tracks(album_id):
    album = sp.album(album_id)
    tracks = album['tracks']['items']
    track_list = []
    total_duration = 0

    for track in tracks:
        track_list.append(track['name'])
        total_duration += track['duration_ms']

    return track_list, total_duration

def ms_to_minutes(ms):
    minutes = (ms // (1000 * 60)) % 60
    hours = (ms // (1000 * 60 * 60)) % 24
    
    return f"{hours:02}:{minutes:02}"

def get_spotify_link(spotify_link):
    album_id = get_album_id_from_url(spotify_link)
    track_list, total_duration = get_album_tracks(album_id)
    alubm_duration = ms_to_minutes(total_duration)
    return track_list, alubm_duration

