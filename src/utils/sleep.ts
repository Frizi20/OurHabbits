export default function sleep(seconds: number): Promise<boolean> {
    return new Promise((res) => {
        setTimeout(() => {
            res(true);
        }, 1000 * seconds);
    });
}
