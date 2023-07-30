package handlers

import (
	"log"
    "net/http"
)

type RedirectHandler struct {}

func NewRedirectHandler() *RedirectHandler {
    return &RedirectHandler{}
}

func (rh *RedirectHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    rh.HandleRequest(w, r)
}

func (rh *RedirectHandler) HandleRequest(w http.ResponseWriter, r *http.Request) {
	log.Println("HandleRequest")

	// Перенаправляем запрос на Nginx
	http.Redirect(w, r, "http://nginx"+r.RequestURI, http.StatusFound)
}
