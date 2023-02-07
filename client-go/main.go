package main

import (
	"context"
	"log"
	"net/http"

	"gopkg.in/yaml.v2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

func main() {
	token := "eyJhbGciOiJSUzI1NiIsImtpZCI6IkYzalRWYmgyc2tOTlQ3encybUFsWUhHOXpSeXpVUWlmd3VPSlZpNkZfNXcifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tcGNzeHYiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjBmNDEwMDY2LTYzYzUtNDhhNC04N2E1LTUyNDE0NjgyYmFjYyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.pkZPEBgPgsSTrwuZOh2bNj2Qi_dg66Uo3XeiZ82p2fqvMdfagDxr3-Kjqz7UAts-oA-BHlNBM5HXsZBPWcARn915At47tjHsZiqB09iH_BvoKXXqEteNPVMxbkpp70BPAmR3BqXWFjOnjtNKqbwhZ66JtclgTG1r_nYtmhvxClzTmkt05bETR9zkobWb4x_c59_VTnG5kBs21zcxr5-ycBhEfUPBzN_Eg6IqBGXbq1xThi9XzWotntM6CHRgYGm3cyMkLh8SFI_BqqCrohpBvhLSu6KSj9r8Shi3luxFdePd1HzjD9wqiJJsLJTnPk72OSDJR4p-C6JG178126k94A"
	host := "https://10.0.20.124:6443"

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
