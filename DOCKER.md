# Docker Setup Guide for swimpos-thermalprinter-nodejs

This project uses Docker Compose to run the thermal-printer service. Compose
keeps the existing `3000:3000` port mapping and automatically restarts the
service if Node.js crashes, the container exits unexpectedly, or the machine
and Docker service restart.

## Prerequisites

- Docker Engine or Docker Desktop with Docker Compose v2 installed.
- Network access from the Docker host to the thermal printer on port `9100`.

## Run from source code

1. Copy or clone the complete project folder. Ensure it includes `Dockerfile`,
   `docker-compose.yml`, `package.json`, and the application files.
2. Open a terminal in the project folder.
3. Start or update the service:

   ```bash
   docker build -t swimpos-thermalprinter:latest .
   docker compose up -d
   ```

4. Confirm that it is running:

   ```bash
   docker compose ps
   ```

5. Test the server at:

   ```text
   http://localhost:3000/
   ```

   The response should be `Hello World!`.

## Install from a pre-built image (installation team)

Use this option when the installation team should deploy the application
without receiving the source code or building an image on the customer
computer.

### Create the installation package

On the development machine, from the project folder, build the image and save
it as a portable archive:

```bash
docker build -t swimpos-thermalprinter:latest .
docker save -o swimpos-thermalprinter.tar swimpos-thermalprinter:latest
```

Give the installation team these three files:

```text
swimpos-thermalprinter.tar
docker-compose.yml
DOCKER.md
```

### Install on the customer computer

1. Install Docker Engine or Docker Desktop with Docker Compose v2.
2. Copy the three installation-package files into one folder.
3. Open a terminal in that folder and load the supplied image:

   ```bash
   docker load -i swimpos-thermalprinter.tar
   ```

4. Start the already-loaded image. The customer computer does not need the
   source code or Dockerfile.

   ```bash
   docker compose up -d
   ```

5. Confirm that the service is running:

   ```bash
   docker compose ps
   ```

6. Confirm the server responds at `http://localhost:3000/`.

To upgrade later, provide a new `.tar` image and run:

```bash
docker compose down
docker load -i swimpos-thermalprinter.tar
docker compose up -d
```

## Migrating from the previous `docker run` command

If the service was originally started with:

```bash
docker run -d -p 3000:3000 --name swimpos-thermalprinter swimpos-thermalprinter
```

run these commands once from the project folder. They replace only the
existing printer-service container with the Compose-managed container:

```bash
docker stop swimpos-thermalprinter
docker rm swimpos-thermalprinter
docker compose up -d
```

## Automatic restart behavior

The `docker-compose.yml` file uses `restart: unless-stopped`.

- If Node.js crashes or the container stops unexpectedly, Docker restarts it.
- If the computer or Docker service restarts, Docker starts the container.
- If an administrator intentionally stops the container, it stays stopped
  until it is started again.

The configured health check reports whether `http://localhost:3000/` responds.
It is a status signal; Docker restarts containers when their process exits.

## Print a bill

Send a `POST` request to `http://localhost:3000/print`:

```json
{
  "data": {
    "Headline": "Thoppans' Swimming Centre\nYMCA complex, Thodupuzha",
    "Items": []
  },
  "printer_ip": "tcp://<EPSON_THERMAL_PRINTER_IP_ADDRESS>"
}
```

Replace `<EPSON_THERMAL_PRINTER_IP_ADDRESS>` with the printer's network IP.
An `Items` field is optional; an empty or omitted list prints a receipt without
line-item rows. `Headline` is optional; if omitted, the configured Thoppans
headline is printed.

## Operations

View live logs:

```bash
docker compose logs -f
```

Check service status and health:

```bash
docker compose ps
```

Restart the service manually:

```bash
docker compose restart
```

Stop the service without removing it:

```bash
docker compose stop
```

Start a previously stopped service:

```bash
docker compose start
```

Remove the service container and its Compose network:

```bash
docker compose down
```

## Notes

- Network printers must be reachable from the Docker host and container.
- USB printers require additional Docker device and permission configuration.
- Application logs are available through `docker compose logs`; no source-code
  changes are required to view them.
