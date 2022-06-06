exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
        
    // on récupère les clés qui ne corespndent pas à des valeurs null
    const keys = Object.keys(object).filter(k => object[k]);
    
    // on récupère les valeurs non null
    const values = Object.values(object).filter(v => v);

    columnSet = keys .map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}