# Docker Setup Guide for swimpos-thermalprinter-nodejs

This guide will help you build and run the swimpos-thermalprinter-nodejs application using Docker.

## Prerequisites
- Docker must be installed on your system. Download from: https://www.docker.com/products/docker-desktop

## Steps

### 1. Clone or copy the project files
Make sure all project files, including `Dockerfile` and `.dockerignore`, are present in a directory.

### 2. Build the Docker image
Open a terminal in the project directory and run:

```
docker build -t swimpos-thermalprinter .
```

This command builds a Docker image named `swimpos-thermalprinter`.

### 3. Run the Docker container
Start the application container with:

```
docker run -d -p 3000:3000 --name swimpos-thermalprinter swimpos-thermalprinter
```

- `-d` runs the container in detached mode.
- `-p 3000:3000` maps port 3000 of the container to port 3000 on your host.
- `--name swimpos-thermalprinter` names your container for easy management.

### 4. Test the server
Open your browser or use curl/Postman to access:

```
http://localhost:3000/
```

You should see `Hello World!` as a response.

### 5. Print a bill
Send a POST request to `http://localhost:3000/print` with the required JSON body:

```
{
  "data": { ... },
  "printer_ip": "tcp://<EPSON_THERMAL_PRINTER_IP_ADDRESS>"
}
```

Replace `<EPSON_THERMAL_PRINTER_IP_ADDRESS>` with your printer's IP address.

---

## How to Set Up and Run on Customer System

You can set up this application on your customer’s computer in two ways:

### Option 1: Using Source Code (Recommended for VS Code Users)
1. **Copy the project folder** (including all files, Dockerfile, and DOCKER.md) to the customer’s computer.
2. Open the folder in VS Code.
3. Make sure Docker Desktop is installed and running.
4. Open a terminal in VS Code (or use Command Prompt/PowerShell in the project folder).
5. Build the Docker image:
   ```
   docker build -t swimpos-thermalprinter .
   ```
6. Run the Docker container:
   ```
   docker run -d -p 3000:3000 --name swimpos-thermalprinter swimpos-thermalprinter
   ```
7. The application is now running and accessible at http://localhost:3000/

### Option 2: Using a Pre-built Docker Image
1. On your (developer) machine, build the image:
   ```
   docker build -t swimpos-thermalprinter .
   docker save -o swimpos-thermalprinter.tar swimpos-thermalprinter
   ```
2. Transfer the `swimpos-thermalprinter.tar` file to the customer’s computer (USB, email, file share, etc).
3. On the customer’s computer, load the image:
   ```
   docker load -i swimpos-thermalprinter.tar
   ```
4. Run the Docker container:
   ```
   docker run -d -p 3000:3000 --name swimpos-thermalprinter swimpos-thermalprinter
   ```
5. The application is now running and accessible at http://localhost:3000/

---

## Notes
- If your printer is on the network, ensure the Docker container can access it.
- For USB printers, additional configuration and permissions may be required.
- Check logs with:
  ```
  docker logs swimpos-thermalprinter
  ```
- Stop the container with:
  ```
  docker stop swimpos-thermalprinter
  ```
- Remove the container with:
  ```
  docker rm swimpos-thermalprinter
  ```
