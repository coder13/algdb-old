module.exports = {
	componentWillMount () {
		window.addEventListener('resize', this.resize);
	},

	componentWillUnmount () {
		window.removeEventListener('resize', this.resize);
	},

	resize () {
		this.forceUpdate();
	}
};
