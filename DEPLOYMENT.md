# NeuroVoxis Single-Service Deployment Guide

## 1. Render Configuration (Unified Service)
Connect your GitHub repo and configure the following:

- **Service Type**: Web Service
- **Name**: `neurovoxis-app`
- **Root Directory**: (Leave blank - use repo root)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn --chdir backend core.wsgi`

### Required Environment Variables (Render Dashboard):
- `PYTHON_VERSION`: `3.13`
- `NODE_VERSION`: `20.x` (or your local version)
- `SECRET_KEY`: (Generate a secure random string)
- `DEBUG`: `False`
- `ALLOWED_HOSTS`: `your-app-name.onrender.com`
- `DATABASE_URL`: (Your PostgreSQL URL)

---

## 2. Why This Works
- **WhiteNoise**: Django is now configured to serve the React files directly from `frontend/dist`.
- **Catch-all Routing**: Any request that isn't for an API or the Admin panel is automatically redirected to the React `index.html`.
- **Unified Build**: The `build.sh` script automatically installs both Node and Python dependencies and builds both parts of your app.

---

## 3. Database
1. Create a **PostgreSQL** instance on Render.
2. Link the **Internal Database URL** to the backend's `DATABASE_URL` env variable.

---

## 4. Local Testing
To test this "Production Mode" locally:
1. `cd frontend && npm run build`
2. `cd ../backend`
3. `set DEBUG=False`
4. `python manage.py collectstatic --no-input`
5. `python manage.py runserver`
Your React app should now be accessible at `http://localhost:8000`.
