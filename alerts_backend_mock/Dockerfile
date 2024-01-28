FROM golang:1.21.5

WORKDIR /app

COPY go ./go
COPY main.go .
COPY go.mod .
COPY go.sum .

RUN go mod download

RUN go build -o /alerts_backend_mock

EXPOSE 8080

CMD [ "/alerts_backend_mock" ]
