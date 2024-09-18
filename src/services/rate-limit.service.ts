export class RateLimitService {
    idToRequestCount = new Map<string, number>(); // keeps track of individual users

    constructor(private readonly options: { maxRequests: number; windowSize: number; windowStart: number }) {}

    rateLimit(ip: string) {
        try {
            // Check and update current window
            const now = Date.now();
            const isNewWindow = now - this.options.windowStart > this.options.windowSize;
            if (isNewWindow) {
                this.options.windowStart = now;
                this.idToRequestCount.set(ip, 0);
            }

            // Check and update current request limits
            const currentRequestCount = this.idToRequestCount.get(ip) ?? 0;
            if (currentRequestCount >= this.options.maxRequests) return true;
            this.idToRequestCount.set(ip, currentRequestCount + 1);

            return false;
        } catch (erorr: any) {
            console.error('ОШИБКА: ', erorr);
            const message = erorr.message;
            throw new Error(message ? message : 'ОШИБКА: ');
        }
    }
}
