package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"gopkg.in/yaml.v2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type Data struct {
	Token string `json:"token"`
	Host  string `json:"host"`
}

func main() {
	data := Data{}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		// Get the data from frontend
		res, err := http.Get("10.96.100.0:80/tokenhost")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer res.Body.Close()

		// Decode the data from JSON to the Data struct
		err = json.NewDecoder(res.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("Data:", data)
	})

	host := data.Host
	token := data.Token

	// Create a config with the given host and token
	config := &rest.Config{
		Host:        host,
		BearerToken: token,
		TLSClientConfig: rest.TLSClientConfig{
			Insecure: true,
		},
	}

	// Create a new Kubernetes client
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Error creating Kubernetes client: %v", err)
	}

	http.HandleFunc("/pods", func(w http.ResponseWriter, r *http.Request) {
		pods, err := clientset.CoreV1().Pods("").List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		podData, err := yaml.Marshal(pods)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/x-yaml")
		w.Write(podData)
	})
	http.HandleFunc("/network-policies", func(w http.ResponseWriter, r *http.Request) {
		networkPolicies, err := clientset.NetworkingV1().NetworkPolicies("").List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var policyData []byte
		for _, networkPolicy := range networkPolicies.Items {
			yamlData, err := yaml.Marshal(networkPolicy)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			policyData = append(policyData, yamlData...)
			policyData = append(policyData, []byte("\n---\n")...)
		}
		w.Write(policyData)
		w.Header().Set("Content-Type", "text/yaml")
	})
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
