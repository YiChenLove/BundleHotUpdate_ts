export default class SingleIns {

	intervalIds:number[] = [];
	constructor() {
		this.intervalIds = [];
	}
    public static getInstance(...args:any[]):any {
		let Class:any = this;
		if (!Class._instance) {
			Class._instance = new Class(...args);
		}
		return Class._instance;
	}


	intervalSchedule(callback, interval = 0) {
		let  intervalId = setInterval(() => {
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