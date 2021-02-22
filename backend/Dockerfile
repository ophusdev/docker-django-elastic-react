# Pull base image
FROM python:3.7

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code/backend

COPY ./requirements.txt /code/backend/requirements.txt
RUN pip install -r requirements.txt

COPY ./backend /code/backend