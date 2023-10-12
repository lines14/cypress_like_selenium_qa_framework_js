class JSONMapper {
    static mapValues(firstObj, secondObj, mappingSchema) {
        const firstFlattenedObj = this.flattenJSON(firstObj);
        const secondFlattenedObj = this.flattenJSON(secondObj);
        for (const key in firstFlattenedObj) {
            for (const path in mappingSchema) {
                if (((this.getNestedProperty(firstFlattenedObj, path)).keys).includes(key)) {
                    firstFlattenedObj[key] = (this.getNestedProperty(secondFlattenedObj, mappingSchema[path]))
                    .values.pop();
                }
            }
        }

        return this.deleteNotSimilarProperty(firstFlattenedObj, mappingSchema);
    }

    static rewriteValues(mappedObj, firstDict, secondDict) {
        const rewritedObj = { ...mappedObj };
        for (const key in rewritedObj) {
            if (firstDict.hasOwnProperty(key) && secondDict.hasOwnProperty(key)) {
                for (const dictKey in secondDict[key]) {
                    if (secondDict[key][dictKey] === rewritedObj[key]) {
                        rewritedObj[key] = firstDict[key][dictKey];
                    }
                }
            }
        }

        return rewritedObj;
    }
    
    static getNestedProperty(flattenedObj, path) {
        const keys = [];
        const values = [];  
        for (const key in flattenedObj) {
            if (key.endsWith('.' + path) || key === path) {
                keys.push(key);
                values.push(flattenedObj[key]);
            }
        }

        return { keys, values };
    }

    static deleteNotSimilarProperty(flattenedObj, mappingSchema) {
        const keysToDelete = [];
        for (const key in flattenedObj) {
            let shouldDelete = true;
            for (const path in mappingSchema) {
                if (key.endsWith('.' + path) || key === path) {
                    shouldDelete = false;
                    break;
                }
            }
    
            if (shouldDelete) {
                keysToDelete.push(key);
            }
        }
    
        keysToDelete.forEach(key => {
            delete flattenedObj[key];
        });
    
        return flattenedObj;
    }    

    static flattenJSON(obj) {
        const result = {};
        const recursive = (currentObj, prefix='') => {
            for (const objKey in currentObj) {
                const fullKey = prefix ? `${prefix}.${objKey}` : objKey;
                if (typeof currentObj[objKey] === 'object') {
                    recursive(currentObj[objKey], fullKey);
                } else {
                    result[fullKey] = currentObj[objKey];
                }
            }
        }
    
        recursive(obj);
        return result;
    }

    static unflattenJSON(flattenedObj) {
        const result = {};
        for (const key in flattenedObj) {
            const keys = key.split('.');
            let currentLevel = result;
            for (let i = 0; i < keys.length - 1; i++) {
                const currentKey = keys[i];
                const nextKeyIsArrayIndex = /^\d+$/.test(keys[i + 1]);
                if (!currentLevel[currentKey] || typeof currentLevel[currentKey] !== 'object') {
                    currentLevel[currentKey] = nextKeyIsArrayIndex ? [] : {};
                }

                currentLevel = currentLevel[currentKey];
            }
    
            currentLevel[keys[keys.length - 1]] = flattenedObj[key];
        }
    
        return result;
    }
}

module.exports = JSONMapper;