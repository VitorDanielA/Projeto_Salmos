const HOST = 'http://localhost:8080/'
const API = 'api/v1/app/'

async function get(endpoint){
    //loadingStart()
    try{
        const fetched = await fetch(HOST+API+endpoint, {method:'GET', headers: {'Content-type': 'application/json'}})
        
        if (fetched.ok){
            const result = await fetched.json();
            //loadingEnd()
            return result
        }
        throw fetched
    }catch(error){
        //loadingEnd()
        throw error
    }
}


async function get_params(endpoint, paramsMap){
    //loadingStart()
    let params = Object.entries(paramsMap).map(a => a.join('='));
     try{
        let url = HOST+API+endpoint+'?'+params.join('&')
        console.log('URL ', url)
         const fetched = await fetch(url, {method:'GET', headers: {'Content-type': 'application/json'}})
        
        if (fetched.ok){
            const result = await fetched.json();
            //loadingEnd()
            return result
        }
        throw fetched
    }catch(error){
        //loadingEnd()
        throw error
    }
}

async function post(endpoint, body){
    loadingStart()
    try{
        const fetched = await fetch(HOST+API+endpoint, {method:'POST', headers: {'Content-type': 'application/json'}, body:body})
        
        if (fetched.ok){
            const result = await fetched.json();

            return result
        }
        throw fetched
    }catch(error){
        throw error
    }
}

const body = document.getElementById('body')

function loadingStart() {
    var loadingDiv = document.createElement('div')
    loadingDiv.id = 'loading-default-div'
    loadingDiv.style.zIndex = 100;
    loadingDiv.style.backgroundColor =  'rgba(255, 255, 255, 0.4)';
    loadingDiv.style.width = '100%';
    loadingDiv.style.height = '100%';
    loadingDiv.style.position =  'absolute';
    loadingDiv.style.top =  0;
    loadingDiv.style.display = 'flex';
    loadingDiv.style.justifyContent = 'center';
    

    var loadingImage = document.createElement('img')

    loadingImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAACpklEQVRoge2ZO2sVQRiG39FEIl6iJlqkiFbKaYI/IDmKEm+gIRa2QfEX2Ai2XjpNHTsbq8RCULEwRjQpoo2CaWxELAQFQU910DwWO0fXda/uTPaI+8CBc9n53u898zE7345UU1NTBuNbABiTdMx+fGCMeeZb0xvANWCVX6wCV6vO668AxiJmwqaavnTX+Qos6bjiS9pIOu1L1KchPMZeezJKbixj7BBwysbY6DPJUWAWmAcuAD0Z11+JWRQuZ4y5BLRDY94A+9060U8z3yL/9kyOcU1g2r6yZmYyZkY7pvrcuQnE5hLKp9+hxmyCIYDRPDGKLArbYr4zkpwZkrQ95bcdeQIUMXQv5rtXxph3BWJkkbSLaEt67lBHAnqAGeC7LYGXQMOxxmZgJabcLrrUiYpuBYY9xt9EsDouAveBCV9aNTU1/wHeO1ZXULbztfedI/aVugn1DWU7X2vmSSjAQlWmKNj5Jm19DksKX3xA0iEfCeegUOfrs2N1RfnO15bcQmh6H3dpyaX2V9FAnUVhvAsWhdyd77+0bDclTdqPd4wxT6vMp6amZg0BeoEGMFR1LqUBpoBPoSV6GRjxKdgP7PYUeyrmBgrwARj0IXgUaFmRm45j90ZmJsq0S72O6HxExNnTH2BfihmApTxxim5p3ofetyR9TkmwT9J5SSckDUh6K+m2pLvGmLgNZytD+2uxVHMA7AJuAY+A8ZTrhol/YAjB8+sNCeOWU2borHNDeQDWAy8yyud6wtgRggUgyhxQzb4TmMgwA8H5z0DC+EGCo5cl4CFwrjIzNqEbOQwBnPSh76NjzXuE6OWo0YehlZzXvfag7R5gJ/Alo9wWq86zEMAZ/jyP7fAR2Ft1joUBDvL7faVNsPzuqTq3UtgSbABbqs6lphv4AT/8SFjNRIBZAAAAAElFTkSuQmCC"

    loadingImage.style.width = '60px';
    loadingImage.style.height = '60px';
    loadingImage.style.margin = 'auto';
    loadingImage.style.animation = 'rotation 2s infinite linear';

    const keyFrames = document.createElement("style");
    keyFrames.innerHTML = `
    @keyframes rotation {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
    }`;


    loadingDiv.appendChild(loadingImage)
    body.appendChild(loadingDiv)
    body.appendChild(keyFrames)
}

function loadingEnd(){
    document.getElementById('loading-default-div').remove()
}