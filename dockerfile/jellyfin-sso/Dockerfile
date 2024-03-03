FROM lscr.io/linuxserver/jellyfin:latest

COPY ./oauth.js /usr/share/jellyfin/web/oauth.js
RUN sed -ri \
    's#<head>#&<script type="text/javascript" src="/web/oauth.js"></script>#' \
    /usr/share/jellyfin/web/index.html