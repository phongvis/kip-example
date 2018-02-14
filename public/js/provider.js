import 'plugins/avis-dev/js/controller';
import 'plugins/avis-dev/css/vis.css';

import VisTypesRegistryProvider from 'ui/registry/vis_types';
import TemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import indexPage from 'plugins/avis-dev/index.html';

VisTypesRegistryProvider.register(Provider);

// The provider function, which must return our new visualization type
function Provider(Private) {
	const TemplateVisType = Private(TemplateVisTypeProvider);
	const Schemas = Private(VisSchemasProvider);

	// Describe our visualization
	return new TemplateVisType({
		name: 'avis-dev',
		title: 'A Vis-dev-dev-dev',
		description: 'Just another visualization-dev-dev-dev',
		icon: 'fa-eye',
		template: indexPage,
		schemas: new Schemas([ // Define the aggregation your visualization accepts
			{
				group: 'metrics',
				name: 'tagsize',
				title: 'Tagsize',
				min: 1,
				max: 1,
				aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
			},
			{
				group: 'buckets',
				name: 'tags',
				title: 'Tags',
				min: 1,
				max: 1,
				aggFilter: '!geohash_grid'
			}
		])
	});
}