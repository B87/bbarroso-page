
FROM gcr.io/distroless/base-debian12 AS deploy-stage
WORKDIR /
COPY bbarroso /bbarroso
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/bbarroso"]