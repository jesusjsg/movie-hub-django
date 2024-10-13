from django.core.paginator import Paginator
from django.shortcuts import render
from .services import Services

def home(request):
    movies = Services()
    movies_popular = movies.get_movies_popular()
    latest_movies = movies.get_latest_movies()

    # Configurar la paginación
    paginator = Paginator(movies_popular, 9) # Clase de Django para manejar la paginacion 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    data = {
        'latest_movies': latest_movies,
        'page_obj': page_obj,
        'images': 'https://image.tmdb.org/t/p/w300/',
    }

    return render(request, 'movies/index.html', data)