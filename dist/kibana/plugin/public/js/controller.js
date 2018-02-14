import uiModules from 'ui/modules';
import vis from 'plugins/avis/js/vis';

const module = uiModules.get('kibana/avis', ['kibana']);

module.controller('VisController', function($scope, $element) {
	$scope.$watch('esResponse', function(resp) {
		if (!resp) return;

		if (!$scope.vis.aggs.bySchemaName['tags']) return;

		// Retrieve the id of the configured tags aggregation
		var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
		// Retrieve the metrics aggregation configured
		var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
		// Get the buckets of that aggregation
		var buckets = resp.aggregations[tagsAggId].buckets;

		// Transform all buckets into tag objects
		const tags = buckets.map(bucket => ({
			label: bucket.key,
			value: metricsAgg.getValue(bucket)
		}));

		const container = $element[0];
		const rect = container.getBoundingClientRect();

		const template = vis()
			.width(rect.width)
			.height(rect.height);

		d3.select(container)
			.datum(tags)
			.call(template);
	});
});