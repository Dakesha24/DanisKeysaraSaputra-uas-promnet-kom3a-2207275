package main

//impor package
import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/items",
		GetUsers).Methods("GET")
	router.HandleFunc("/items",
		CreateUser).Methods("POST")
	router.HandleFunc("/items/{id}",
		GetUser).Methods("GET")
	router.HandleFunc("/items/{id}",
		UpdateUser).Methods("PUT")
	router.HandleFunc("/items/{id}",
		DeleteUser).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var items []Item

	result, err := db.Query("SELECT id, nama_barang,jumlah,harga_satuan,lokasi,deskripsi from inventory_danis")

	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var item Item
		err := result.Scan(&item.ID, &item.Nama_Barang, &item.Jumlah, &item.Harga_Satuan, &item.Lokasi, &item.Deskripsi)

		if err != nil {
			panic(err.Error())
		}
		items = append(items, item)
	}
	json.NewEncoder(w).Encode(items)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    stmt, err := db.Prepare("INSERT INTO inventory_danis(nama_barang, jumlah, harga_satuan, lokasi, deskripsi) VALUES (?, ?, ?, ?, ?)")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    var item Item
    if err := json.Unmarshal(body, &item); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    _, err = stmt.Exec(item.Nama_Barang, item.Jumlah, item.Harga_Satuan, item.Lokasi, item.Deskripsi)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "New item was created")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama_barang, jumlah,harga_satuan,lokasi,deskripsi from inventory_danis WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var item Item
	for result.Next() {
		err := result.Scan(&item.ID, &item.Nama_Barang,
			&item.Jumlah, &item.Harga_Satuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(item)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE inventory_danis SET nama_barang = ?," +
		"jumlah= ?, harga_satuan=?, lokasi=?, deskripsi=? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	nama_barang := keyVal["nama_barang"]
	jumlah := keyVal["jumlah"]
	harga_satuan := keyVal["harga_satuan"]
	lokasi := keyVal["lokasi"]
	deskripsi := keyVal["deskripsi"]
	_, err = stmt.Exec(nama_barang, jumlah, harga_satuan, lokasi, deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Item with ID = %s was updated",
		params["id"])
}


func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM inventory_danis WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Item with ID = %s was deleted",
		params["id"])
}



type Item struct {
	ID        string `json:"id"`
	Nama_Barang		   string `json:"nama_barang"`
	Jumlah      string `json:"jumlah"`
	Harga_Satuan  string `json:"harga_satuan"`
	Lokasi    string `json:"lokasi"`
	Deskripsi	string `json:"deskripsi"`
}


var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2207275_danis_uas")
	if err != nil {
		panic(err.Error())
	}
}

type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}

	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
