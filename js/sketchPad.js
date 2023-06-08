class SketchPad {
	constructor(container, size = 400) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = size;
		this.canvas.height = size;
		this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
		container.appendChild(this.canvas);

		this.ctx = this.canvas.getContext("2d");
		this.paths = [];
		this.isDrawing = false;

		this.#addEventListeners();
	}

	#addEventListeners() {
		/* mouse handlers */
		this.canvas.onmousedown = (e) => {
			const mouse = this.#getMouseLocation(e);
			this.paths.push([mouse]);
			this.isDrawing = true;
		};
		this.canvas.onmousemove = (e) => {
			if (this.isDrawing) {
				const mouse = this.#getMouseLocation(e);
				const lastPath = this.paths[this.paths.length - 1];
				lastPath.push(mouse);
				this.#clearAndRedraw();
			}
		};
		this.canvas.onmouseup = () => {
			this.isDrawing = false;
		};
		/* touch handlers */
		this.canvas.ontouchstart = (e) => {
			const loc = e.touches[0];
			this.canvas.onmousedown(loc);
		};
		this.canvas.ontouchmove = (e) => {
			const loc = e.touches[0];
			this.canvas.onmousemove(loc);
		};
		this.canvas.ontouchend = () => {
			this.canvas.onmouseup();
		};
	}
	#clearAndRedraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		draw.paths(this.ctx, this.paths);
	}
	#getMouseLocation = (e) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(e.clientX - rect.left),
			Math.round(e.clientY - rect.top),
		];
	};
}
