export function doesHttpOnlyCookieExist(cookiename: string) {
    const d = new Date();
    d.setTime(d.getTime() + 1000);
    const expires = 'expires=' + d.toUTCString();

    document.cookie = cookiename + '=new_value;path=/;' + expires;
    const cookieExists = document.cookie.indexOf(cookiename + '=') == -1;

    if (cookieExists) {
        delete_cookie(cookiename, '/', 'localhost');
    }

    return cookieExists;
}

function delete_cookie(name: string, path: string, domain: string) {
    if (get_cookie(name)) {
        document.cookie =
            name +
            '=' +
            (path ? ';path=' + path : '') +
            (domain ? ';domain=' + domain : '') +
            ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
}

function get_cookie(name: string) {
    return document.cookie.split(';').some((c) => {
        return c.trim().startsWith(name + '=');
    });
}
