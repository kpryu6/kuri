package api

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	engine *gin.Engine
	server *http.Server
}

// New initializes Handler
func New() *Handler {
	return &Handler{
		engine: gin.Default(),
		server: &http.Server{},
	}
}

// InitRoutes initializes all routes for endpoint
func (h *Handler) InitRoutes() {
	h.engine.POST("/login", h.loginHandler)
	h.engine.POST("/pods", h.podsHandler)
	h.engine.POST("/pods/:namespace", h.podsHandler)
	h.engine.POST("/network-policies", h.networkPoliciesHandler)

}

func (h *Handler) Run() {
	config := cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Authorization", "Origin"},
	}

	// Service at port 8081
	h.server.Addr = "0.0.0.0:8081"
	//h.engine.Use(cors.Default())
	h.engine.Use(cors.New(config))
	h.server.Handler = h.engine

	// Start HTTP Server
	if err := h.server.ListenAndServe(); err != nil {
		fmt.Printf("Error starting the server: %v\n", err)
	}
}
