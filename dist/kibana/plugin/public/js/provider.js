import 'plugins/avis/js/controller';
import 'plugins/avis/css/vis.css';

import VisTypesRegistryProvider from 'ui/registry/vis_types';
import TemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import indexPage from 'plugins/avis/index.html';

VisTypesRegistryProvider.register(Provider);

// The provider function, which must return our new visualization type
function Provider(Private) {
	const TemplateVisType = Private(TemplateVisTypeProvider);
	const Schemas = Private(VisSchemasProvider);

	// Describe our visualization
	return new TemplateVisType({
		name: 'avis',
		title: 'A Vis',
		description: 'Just another visualization',
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