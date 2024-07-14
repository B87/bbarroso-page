FROM golang:latest AS fetch-stage
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Generate templ
FROM ghcr.io/a-h/templ:latest AS generate-stage
COPY --chown=65532:65532 . /app
WORKDIR /app
RUN ["templ", "generate"]

# Build binary
FROM golang:latest AS build-stage
COPY --from=generate-stage /app /app
WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bbarroso cmd/api/main.go

# Final image
FROM gcr.io/distroless/base-debian12 AS deploy-stage
COPY --from=build-stage /app/bbarroso /bbarroso
USER nonroot:nonroot
ENTRYPOINT ["/bbarroso"]