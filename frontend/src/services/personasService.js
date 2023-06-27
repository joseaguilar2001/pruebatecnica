import axios from "axios";

export class PersonasServices {
    url = "http://localhost:8080/personas";

    create(personas){
        return axios.post(this.url, personas).then(res => res.data);
    }
    
    readAll(){
        return axios.get(this.url).then(res => res.data);
    }

    update(personas){
        return axios.put(this.url + personas.id, personas).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.url + id).then(res => res.data);
    }
}