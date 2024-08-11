package server

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/gin-gonic/gin"

	"github.com/b87/bbarroso-page/server/web"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		templ.Handler(web.Index()).ServeHTTP(c.Writer, c.Request)
	})
	r.GET("/healthcheck", s.HealthCheckHandler)

	r.Static("/assets", "./assets")
	r.StaticFile("/favicon.ico", "./assets/favicon.ico")

	return r
}

func (s *Server) HealthCheckHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Ok"
	c.JSON(http.StatusOK, resp)
}
