export default function until(condition: Function) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) return;

            clearInterval(interval);
            resolve(true);
        }, 100);
    });
}
