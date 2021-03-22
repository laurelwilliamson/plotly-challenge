function init() {  
    // dropdown
      var selector = d3.select("#selDataset");
 // populate options
  d3.json("data/samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {selector
            .append("option")        
            .text(sample)        
            .property("value", sample); 
           });
   // get first sample
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);  });}
// Initializing
function optionChanged(newSample) { 
     //new data 
    buildMetadata(newSample);  
    buildCharts(newSample);  }
// Demographics Panel 
function buildMetadata(sample) {  
    d3.json("data/samples.json").then((data) => {    
        var metadata = data.metadata;    // Filter the data for the object with the desired sample number    
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);    
        var result = resultArray[0];       // Use d3 to select the panel with id of #sample-metadata    
        var PANEL = d3.select("#sample-metadata");
   // Use `.html("") to clear any existing metadata    
        PANEL.html("");
   // Use Object.entries to add each key and value pair to the panel      
        Object.entries(result).forEach(([key, value]) => {PANEL
            .append("h6")
            .text(`${key.toUpperCase()}: ${value}`);    
        });
    });
}

// Create the buildChart function.
function buildCharts(sample) {  
    // Use d3.json to load the samples.json file   
    d3.json("data/samples.json").then(sampleData => {
        
        var data = sampleData;
        var names = data.names;
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
        var BUBBLE = d3.select("#bubble");
        var BAR = d3.select("#bar");
        

        //Bar chart
        
        var trace1 = {
            x : ten_vals[0],
            y : ten_ids[0].map(x => "OTU" + x),
            text : ten_labels[0],
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


        var data = [trace1];
        var responsiveness = {responsive:true};
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
                l: 155,
                r: 55,
                b: 55,
                t: 55,
                pad: 4.5
              }
    };
    var responsiveness2 = {responsive:true};

    // Create bubble chart
    var data_b = [trace2];
    Plotly.newPlot('bubble', data_b,layout2,responsiveness2);
    
    });
}

init();
