export class n2yo {
    constructor(apiKey: string)
    {
        this.apiKey = apiKey;
        this.req = new XMLHttpRequest();
    }
    req:XMLHttpRequest;
    apiKey:string;
    baseURL:string = "https://api.n2yo.com/rest/v1/satellite"
    tle:any;
    fetchTLE(satellite : number) {
        const url = `${this.baseURL}/tle/${satellite.toString()}?apiKey=${this.apiKey}`;
        var jsonn;
        fetch(url, {
            method: "GET",
            //mode: "no-cors",
        })
            .then((response) => {
                console.log(response.status);
                console.log(response.statusText);
                if (response.status == 200) {
                    response.json();
                    return null;
                } else {
                    console.error("Error: Unable to fetch data");
                    return null;
                }
            }).then((json) => {
                jsonn= json;
            })
        .catch((error) => {
            console.error("Error:", error);
            return null;
        });
        return jsonn;

    }
    getTLE(satellite:number)
    {
        const url = `${this.baseURL}/tle/${satellite.toString()}?apiKey=${this.apiKey}`;
        this.req.open("get", url);
        this.req.onload = this.tleFunc
        this.req.send();
    }
    private tleFunc()
    {
        const data = JSON.parse(this.req.response);
        console.log(data)
        console.log(data["tle"]);
        this.tle = data
        return data;
    }
}
