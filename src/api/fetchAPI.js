function _fetch(url, data, method = 'GET', options = {}) {
    const body = o2s(data);
    let params = {
        method: method,
        mode: 'cors'
    };
    if (method === 'GET') { // 如果是GET请求，拼接url
        url += '?' + body;
    } else {
        params.body = body
    }
    if (options.cookie) {
        params.credentials = 'include'
    }
    if (options.headers != undefined && typeof options.headers == "object") {
        params.headers = new Headers(options.headers);
    } else {
        params.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
    }
    return fetch(url, params)
        .then(_checkStatus)
        .then(r => (r.headers.get("content-type") === "application/json" ? r.json() : r.text()))
        .catch(function(error) {
            return error;
        })
    // return fetch(url, params);
}
function _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}
export function o2s(obj, arr = [], idx = 0) {
    for (let item in obj) {
        arr[idx++] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
}
export function get(url, data, options = {}) {
    return _fetch(url, data, 'GET', options);
}

export function post(url, data, options = {}) {
    return _fetch(url, data, 'POST', options);
}
