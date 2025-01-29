export const toCamelCase = (str) => {    
    return str
        .split(/[\s_-]+/)
        .map((word, index) => {
            return index === 0 
                ? word.toLowerCase() 
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}