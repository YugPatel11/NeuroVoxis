
# NeuroVoxis Backend — Deployment Guide (Phase 6)

## 1. Production Requirements
```
gunicorn
whitenoise
dj-database-url
psycopg2-binary
python-decouple
```

## 2. `settings.py` Production Changes
```python
import dj_database_url
from decouple import config

DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

DATABASES = {
    'default': dj_database_url.config(default=config('DATABASE_URL'))
}

STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ...
]
```

## 3. Gunicorn Start Command
```bash
gunicorn core.wsgi:application --bind 0.0.0.0:8000
```

## 4. Environment Variables (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=postgres://user:password@host:5432/neurovoxis
ALLOWED_HOSTS=your-domain.com
```

## 5. Frontend Deployment (Vercel)
```bash
npm run build
# then push to GitHub and connect to Vercel
# Set env variable: VITE_API_URL=https://your-backend-domain.com/api/
```

## 6. Backend Deployment (Render)
- New Web Service → connect GitHub repo
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn core.wsgi:application`
- Add PostgreSQL database from Render dashboard

## 7. Final Checklist
- [ ] Set DEBUG=False in production
- [ ] Migrate DB: `python manage.py migrate`
- [ ] Collect static: `python manage.py collectstatic`
- [ ] Run tests: `python manage.py test`
- [ ] Set CORS headers for frontend domain
