import uiModules from 'ui/modules';
import visModule from 'plugins/avis-dev/js/vis';

const module = uiModules.get('kibana/avis-dev', ['kibana']);

module.controller('VisController', ($scope, $element) => {
	const vis = visModule();

	$scope.$watch('esResponse', resp => {
		if (!resp) return;

		if (!$scope.vis.aggs.bySchemaName['tags']) return;

		// Retrieve the id of the configured tags aggregation
		const tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
		// Retrieve the metrics aggregation configured
		const metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
		// Get the buckets of that aggregation
		const buckets = resp.aggregations[tagsAggId].buckets;

		// Transform all buckets into tag objects
		const tags = buckets.map(bucket => ({
			label: bucket.key,
			count: metricsAgg.getValue(bucket)
		}));

		const container = $element[0];
		const rect = container.getBoundingClientRect();

		vis.width(rect.width)
			.height(rect.height)
			.id(d => d.label);

		d3.select(container)
			.datum(tags)
			.call(vis);
	});
});