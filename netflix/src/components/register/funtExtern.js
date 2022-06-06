
export function hash(val, val2, val3) {
    let union = val + val2 + val3;
    let result = '';
    for (let i = 0; i < union.length; i++) {
        result += union.slice(0,1) + union.charCodeAt(i)
        
    }
    return result.split('').reverse().join('').slice(union.length / 2)
}