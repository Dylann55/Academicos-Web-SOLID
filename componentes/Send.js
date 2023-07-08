export const showMiddlewareData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

export const getMiddlewareData = async (url,config) => {
    const response = await fetch(url,config);
    return response.json();
}

export const getMiddlewareStatus = async (url,config) => {
    const response = await fetch(url,config);
    return response.ok;
}