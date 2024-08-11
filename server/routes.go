package server

import (
	"embed"
	"io/fs"
	"net/http"

	"github.com/a-h/templ"
	"github.com/gin-gonic/gin"

	"github.com/b87/bbarroso-page/server/web"
)

//go:embed assets/*
var StaticFiles embed.FS

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()
	// Create a filesystem using the embedded files
	fs, err := fs.Sub(StaticFiles, "assets")
	if err != nil {
		panic(err)
	}
	r.GET("/", func(c *gin.Context) {
		templ.Handler(web.Index()).ServeHTTP(c.Writer, c.Request)
	})
	r.GET("/healthcheck", s.HealthCheckHandler)

	r.StaticFS("/assets", http.FS(fs))
	r.StaticFile("/favicon.ico", "./assets/favicon.ico")

	return r
}

func (s *Server) HealthCheckHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Ok"
	c.JSON(http.StatusOK, resp)
}
