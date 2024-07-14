FROM debian:stretch-slim
WORKDIR /app
COPY ./main ./main
CMD ["/main"]