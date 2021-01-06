//Bar Chart Code 

function init() {
   
//Set variable to establish placement of bar graph in html file

var CHART = d3.selectAll("#bar").node();

//Read in JSON file

d3.json("samples.json").then(importedData => {
var data = importedData;

//Pull test subjects IDs from data
testsubjects = data.names;
    
//Get the naval samples from data
testsamples = data.samples;

//Fetch metadata from data
metadata = data.metadata;

// Pre-Populate data into the Test Subject dropdown
// Select the d3 input element for the dropdown
const subjectselect = d3.select("#selDataset");

// Build the Test Subject ID drop down list
testsubjects.forEach(namevalue =>{
var option = subjectselect.append("option");
option.text(namevalue);
option.attr("value",namevalue);
});

// Create arrays for the bar chart's primary axes and labels
// [0] is used b/c the first subject ID is 0

let sampvalues = justsamples[0].sample_values;
let otuids = justsamples[0].otu_ids;
let otulabels = justsamples[0].otu_labels;

// Select the first 10 objects for plotting on the bar chart 
sampvalues = sampvalues.slice(0, 10);
otuids = otuids.slice(0, 10);
otulabels = otulabels.slice(0,10);

// Format OTU ID string
let otuidslist = otuids.map(otuid => 'OTU ' + otuid);

// Reverse arrays to meet plotly standards
sampvalues = sampvalues.reverse();
otuidslist = otuidslist.reverse();
otulabels = otulabels.reverse();

// Trace for the the bar chart
var trace = {
    x: sampvalues,
    y: otuidslist,
    text: otulabels,
    type: "bar",
    orientation: "h"
};

// data
var chartData = [trace];

// Apply the group bar mode to the layout
var layout = {
title: "Top 10 OTUs Present in Individual Belly Buttons"
};

Plotly.newPlot(CHART, chartData, layout);

// Bubble Chart Code

var trace1 = {
    x: samples[0].otu_ids,
    y: samples[0].sample_values,
    text: samples[0].otu_labels,
    mode: 'markers',
    marker: {
        size: samples[0].sample_values,
        color: samples[0].otu_ids,
        colorscale: [[0, 'rgb(0,0,225)'],[1, 'rgb(255,0,0)']]
    }
};
var data = [trace1];
  
  var layout = {
    title: 'All samples taken for the individual subject',
    showlegend: false
  };
    Plotly.newPlot('bubble', data, layout);

  
  // Populate the Demographic Data panel

    d3.select("#sample-metadata").append("p").text('ID: '+ justmetadata[0].id);
    d3.select("#sample-metadata").append("p").text('Ethnicity: '+ justmetadata[0].ethnicity);
    d3.select("#sample-metadata").append("p").text('Gender: '+ justmetadata[0].gender);
    d3.select("#sample-metadata").append("p").text('Age: '+ justmetadata[0].age);
    d3.select("#sample-metadata").append("p").text('Location: '+ justmetadata[0].location);
    d3.select("#sample-metadata").append("p").text('Bbtype: '+ justmetadata[0].bbtype);
    d3.select("#sample-metadata").append("p").text('Wfreq: '+ justmetadata[0].wfreq);
  
   //***********************************************
   // Plot the Belly button washing Gauge chart 
   //***********************************************
     initGaugeChart();
  });
};  
// End of init() function


