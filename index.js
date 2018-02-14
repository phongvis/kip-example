export default function (kibana) {
	return new kibana.Plugin({
		uiExports: {
			visTypes: [
				'plugins/avis-dev/js/provider'
			]
		}
	});
}