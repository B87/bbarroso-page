# Fetch dependencies
FROM golang:latest AS fetch-stage
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Generate templ
FROM ghcr.io/a-h/templ:latest AS generate-stage
WORKDIR /app
COPY --from=fetch-stage /app /app
COPY . /app
RUN ["templ", "generate"]

# Build binary
FROM golang:latest AS build-stage
WORKDIR /app
COPY --from=generate-stage /app /app
RUN CGO_ENABLED=0 go build -o /app/bbarroso

# Final image
FROM gcr.io/distroless/base-debian12 AS deploy-stage
WORKDIR /
COPY --from=build-stage /app/bbarroso /bbarroso
USER nonroot:nonroot
ENTRYPOINT ["/bbarroso"]