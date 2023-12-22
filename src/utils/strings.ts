export function abreviate(name: string): string {
    const words = name.split(' ');
    let abreviation = '';

    if (words.length > 1) {
        abreviation = words.reduce((acc, curr) => {
            return acc + curr[0].toUpperCase();
        }, '');
    } else {
        abreviation = name[0].toUpperCase() + name[1].toUpperCase();
    }

    return abreviation;
}
