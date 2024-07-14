# Simple Makefile for a Go project

# Build the application
all: build

build:
	@echo "Building..."
	@templ generate
	@tailwindcss -i assets/css/input.css -o assets/css/output.css
	@go build -o tmp/bbarroso

docker:
	@echo "Building Docker Image..."
	@docker build -t "bbarroso:latest" --load .

# Run the application
run:
	@go run main.go server


# Test the application
test:
	@echo "Testing..."
	@go test ./tests -v

# Clean the binary
clean:
	@echo "Cleaning..."
	@sudo kill $(sudo lsof -n -i :8080 | grep LISTEN | awk '{print $2}')

# Live Reload
watch:
	@if command -v air > /dev/null; then \
	    air; \
	    echo "Watching...";\
	else \
	    read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
	    if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
	        go install github.com/air-verse/air@latest; \
	        air; \
	        echo "Watching...";\
	    else \
	        echo "You chose not to install air. Exiting..."; \
	        exit 1; \
	    fi; \
	fi

.PHONY: all build run test clean
