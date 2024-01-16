package common

type Pod struct {
	Name            string            `json:"name"`
	Namespace       string            `json:"namespace"`
	Labels          map[string]string `json:"labels"`
	Status          string            `json:"status"`
	Ports           []string          `json:"ports"`
	ContainerImages []string          `json:"containerImages"`
	// TODO: implement next pods
	// NextPods              `json:"nextPods"`
}

type Pods struct {
	Pods []Pod
}
