export default function SingleIns<E>() {
    class SingletonE {
        intervalIds: number[] = [];
        protected constructor() {
            this.intervalIds = [];
        }
        private static _inst: SingletonE = null;
        public static get inst(): E {
            if (SingletonE._inst == null) {
                SingletonE._inst = new this();
            }
            return SingletonE._inst as E;
        }

        intervalSchedule(callback, interval = 0) {
            let intervalId = setInterval(() => {
                callback();
            }, interval * 1000); // interval is in seconds
            this.intervalIds.push(intervalId);
        }

        unIntervalSchedule() {
            const timeoutIds = this.intervalIds;
            timeoutIds.forEach((id: number) => clearInterval(id));
            this.intervalIds = [];
        }
    }

    return SingletonE;
}
