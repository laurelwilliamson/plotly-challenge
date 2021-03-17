// can we rename this function

// function optionChanged(id) {
//     makeDropdown();
//     updatePlotly();
//     updateDemographics();
// }
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// // select a sample and with the ID name, grab the otu_ids and sample_values
// // id (name) and otu_ids ()
// // otu_ids is the key, sample_values is the value
// // otu_ids is the label, otu_labels is the tooltip
// // Call updatePlotly() when a change takes place to the DOM
function Dropdown(){
    d3.json("data/samples.json").then(sampleData => {

        //data, names, dropdown menu
        var data = sampleData;
        var names = data.names;
        var dropdownMenu = d3.select('#selDataset');
    
        names.forEach(name => {
            var option = dropdownMenu.append('option');
            option.attr('value',name);
            option.text(name);
        });

    });
};


d3.selectAll('body').on("change", updatePlotly(this.value));

function optionChanged(name){
    updatePlotly();
}

// This function is called when a dropdown menu item is selected
function updatePlotly() {

    d3.json("data/samples.json").then(sampleData => {
  // Initialize x and y arrays
        var s_values_y = data.samples.map(d=>d.sample_values);
        var o_ids_x = data.samples.map(d=>d.otu_ids);
        var o_labels = data.samples.map(d=>d.otu_labels);

        var sorted_vals = s_values_y.sort().reverse();
        var ten_vals = sorted_vals.map(s => s.slice(0,10));

        var sorted_labels = o_labels.sort().reverse();
        var ten_labels = sorted_labels.map(s => s.slice(0,10));

        var sorted_ids = o_ids_x.sort().reverse();
        var ten_ids = sorted_ids.map(s =>s.slice(0,10));

        var metadata = sampleData.metadata;
        var first_one = metadata[0];

        // do i need this

        var s_metadata = d3.select("#sample-metadata").selectAll('h1')
    
        var first_md = s_metadata.data(d3.entries(first_one))
        first_md.enter()
                        .append('h1')
                        .merge(firstMetadata)
                        .text(d => `${d.key} : ${d.value}`)
                        .style('font-size','12px')
      
        firstMetadata.exit().remove()

        //end section

        //Bar chart
        
        var trace1 = {
            x : ten_vals[0],
            y : ten_ids[0].map(x => "OTU" + x),
            text : top_label[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        };
    
        var layout1 = {
            title : '<b>OTU Frequency</b>'
        };
// what happens when we take out responsiveness part 
        var data = [trace1];
        var responsiveness = {responsive:true}
        Plotly.newPlot('bar', data, layout1, responsiveness);

         // Bubble Chart
    var trace2 = {
        x : o_ids_x[0],
        y : s_values_y [0],
        text : o_labels[0],
        mode : 'markers',
        marker : {
            color : o_ids_x[0],
            size : s_values_y[0]
        }
    };

    var layout2 = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        showlegend: false,
            margin: {
                l: 155
                r: 55,
                b: 55,
                t: 55,
                pad: 4.5
              }
    };
    var responsiveness2 = {responsive:true}

    // Create bubble chart
    var data_b = [trace2];
    Plotly.newPlot('bubble',data_b,layout2,responsiveness2);
    
    };
};

function init(){
    Dropdown();
    
};

init();

// function updateDemographics(id) {
//     d3.json("samples.json").then((data) => {

//         var md_samples = data.metadata.filter(x => x.id === +id)[0];

//         var sample_metadata = d3.select("#sample-metadata").selectAll('h1')
//         var s_md= sample_metadata.data(d3.entries(md_samples))
//         s_md.enter().append('h1').merge(s_md).text(d => `${d.key} : ${d.value}`).style('font-size','14px');

//     };
// };

   




// Use sample_values as the values for the bar chart.


// Use otu_ids as the labels for the bar chart.


// Use otu_labels as the hovertext for the chart.

// Create a bubble chart that displays each sample.



// Use otu_ids for the x values.


// Use sample_values for the y values.


// Use sample_values for the marker size.


// Use otu_ids for the marker colors.


// Use otu_labels for the text values.

// Display the sample metadata, i.e., an individual's demographic information.


// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.

// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

