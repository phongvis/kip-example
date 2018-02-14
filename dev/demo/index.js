document.addEventListener('DOMContentLoaded', function() {
    // Data
    let data = generateData();

    // Instantiate vis
    const vis = pv.vis.template();

    // Run the first time to build the vis
    updateVis();

    // Rebuild vis when the window is resized
    window.onresize = _.throttle(updateVis, 100);

    /**
     * Updates vis when window changed.
     */
    function updateVis() {
        // Update size of the vis
        vis.width(window.innerWidth)
            .height(window.innerHeight);

        // Update size of the vis container and redraw
        d3.select('.vis-container')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight)
            .datum(data)
            .call(vis);
    }

    /**
     * Randomly generates random 10 numbers.
     */
    function generateData() {
        return d3.range(10).map(i => ({
            id: i,
            label: i,
            count: Math.round(Math.random() * 1000)
        }));
    }
});