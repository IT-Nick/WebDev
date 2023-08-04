package handlers

import (
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

func (ah *AuthHandler) LoginForm(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		http.ServeFile(w, r, "internal/handlers/loginform.html")
		return
	}

	if r.Method == http.MethodPost {
		username := r.FormValue("username")
		password := r.FormValue("password")

		if username == "admin" && password == "admin" {
			form := url.Values{}
			form.Add("username", username)
			req, err := http.NewRequest("POST", "http://localhost:8080/api/login", strings.NewReader(form.Encode()))
			if err != nil {
				http.Error(w, "Error creating request: "+err.Error(), http.StatusInternalServerError)
				return
			}
			req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
			req.Header.Set("X-Secret-Key", os.Getenv("SECRET_LOGIN_KEY"))

			client := &http.Client{}
			resp, err := client.Do(req)
			if err != nil {
				http.Error(w, "Error executing request: "+err.Error(), http.StatusInternalServerError)
				return
			}
			defer resp.Body.Close()

			token, err := io.ReadAll(resp.Body)
			if err != nil {
				http.Error(w, "Error reading response: "+err.Error(), http.StatusInternalServerError)
				return
			}

			w.Write(token)
			return
		}

		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	}
}
