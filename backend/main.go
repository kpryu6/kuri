package main

import "main/api"

func main() {
	// Initialize rest API handler
	apiHandler := api.New()
	apiHandler.InitRoutes()

	// Start Server
	apiHandler.Run()
}
