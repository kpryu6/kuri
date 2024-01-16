package common

type LoginRequest struct {
	Token string `json:"token"`
	Host  string `json:"host"`
}
