export function deepAssign<T = any>(target: any, ...others: any[]): T {
    others.forEach(obj => {
        obj && Object.keys(obj).forEach(key => {
            const value = obj[key];
            const origValue = target[key];
            const bothAreObjects = typeof value === "object" && typeof origValue === "object" && value && origValue;
            const eitherIsArray = Array.isArray(value) || Array.isArray(origValue)
            if (bothAreObjects && !eitherIsArray) {
                deepAssign(origValue, value);
            } else {
                target[key] = value;
            }
        });
    });
    return target;
}