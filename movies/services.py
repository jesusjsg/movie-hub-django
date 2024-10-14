import requests
import os
from datetime import datetime
from dotenv import load_dotenv


class Services:

    BASE_URL = 'https://api.themoviedb.org/3/'

    def __init__(self, language='en-US') -> None:
        load_dotenv()
        self.api_key = os.getenv('API_KEY')
        self.language = language

    def get_api(self, url):
        print(f'Requesting url: {url}')
        response = requests.get(url)

        if response.status_code == 200:
            return response.json()
        else:
            return None
    
    def get_movies_popular(self):
        response = self.get_api(f'{self.BASE_URL}movie/popular?api_key={self.api_key}&language={self.language}')

        if response:
            return response.get('results')
        else:
            return None
    
    def get_latest_movies(self):
        current_year = datetime.now().year

        response = self.get_api(f'{self.BASE_URL}discover/movie?api_key={self.api_key}&language={self.language}&primary_release_year={current_year}&sort_by=release_date.desc')

        if response:
            return response['results'][:4]
        else:
            return None
        
    def get_genres_movies(self):
        response = self.get_api(f'{self.BASE_URL}genre/movie/list?api_key={self.api_key}&language={self.language}')

        if response:
            return response.get('genres')
        else:
            return None
    
    def get_genres_tv(self):
        response = self.get_api(f'{self.BASE_URL}genre/tv/list?api_key={self.api_key}&language={self.language}')

        if response:
            return response.get('genres')
        else:
            return None