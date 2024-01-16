package api

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"log"
	"main/api/common"
	"net/http"
	"strconv"
)

func (h *Handler) loginHandler(c *gin.Context) {
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin")
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

	var requestBody common.LoginRequest

	// Bind JSON request body to struct (LoginRequest)
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	log.Println("request body (Host)", requestBody.Host)
	log.Println("request body (Token)", requestBody.Token)

	// Create a config with the given host and token
	config := &rest.Config{
		Host:        "https://" + requestBody.Host + ":6443",
		BearerToken: requestBody.Token,
		TLSClientConfig: rest.TLSClientConfig{
			Insecure: true,
		},
	}

	// Create a new Kubernetes client
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		// log.Fatalf("Error creating Kubernetes client: %v", err)
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	// Check if Reachable to cluster
	_, err = clientset.CoreV1().Pods("default").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		// not reachable (401 unauthorized)
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
	return

}

func (h *Handler) podsHandler(c *gin.Context) {
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin")
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

	namespace := c.Param("namespace")

	var requestBody common.LoginRequest

	// Bind JSON request body to struct (LoginRequest)
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	// Create a config with the given host and token
	config := &rest.Config{
		Host:        "https://" + requestBody.Host + ":6443",
		BearerToken: requestBody.Token,
		TLSClientConfig: rest.TLSClientConfig{
			Insecure: true,
		},
	}

	// Create a new Kubernetes client
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		// log.Fatalf("Error creating Kubernetes client: %v", err)
		c.JSON(http.StatusBadRequest, nil)
	}

	// get Pods info from given Kubernetes cluster
	pods, err := clientset.CoreV1().Pods(namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	var processedPods []common.Pod

	// Data Processing (Pods)
	podItems := pods.Items
	// Extract relevant fields
	for _, pod := range podItems {
		ports := []string{}
		images := []string{}

		for i := 0; i < len(pod.Spec.Containers); i++ {
			images = append(images, pod.Spec.Containers[i].Image)
			for _, portInfo := range pod.Spec.Containers[i].Ports {
				ports = append(ports, strconv.FormatInt(int64(portInfo.ContainerPort), 10))
			}
		}

		pod := common.Pod{
			Name:            pod.Name,
			Namespace:       pod.Namespace,
			Labels:          pod.Labels,
			Status:          string(pod.Status.Phase),
			Ports:           ports,
			ContainerImages: images,
		}

		processedPods = append(processedPods, pod)
	}

	// Print the extracted pod information
	for _, pod := range processedPods {
		log.Printf("Pod Name: %s\n", pod.Name)
		log.Printf("Namespace: %s\n", pod.Namespace)
		log.Printf("Labels: %s\n", pod.Labels)
		log.Printf("Status: %s\n", pod.Status)
		log.Printf("Ports: %s\n", pod.Ports)
		log.Printf("Container Images: %s\n", pod.ContainerImages)
		log.Println("-----------")
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusOK, processedPods)
	return
}

// TODO
func (h *Handler) networkPoliciesHandler(c *gin.Context) {

}
