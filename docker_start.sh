#!/bin/bash

# Befehl zum Herunterfahren der Docker-Compose-Dienste
sudo docker compose down

# Befehl zum Starten der Docker-Compose-Dienste mit der dev-Konfigurationsdatei
sudo docker compose -f docker-compose.dev.yml up