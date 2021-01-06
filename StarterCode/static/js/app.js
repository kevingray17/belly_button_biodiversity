    // Bar Chart Code

function init() {
  
    // Create variable setting bar chart's location in html file
    var CHART = d3.selectAll("#bar").node();
  
    // Fetch data in the json
      d3.json("samples.json").then(importedData => {
      var data = importedData;
  
    // Grab the "testsubject ids" from the data 
      testsubjects = data.names;
  
    // Grab the "samples" from the data set
      samples = data.samples;
  
    // Grab the "metadata" from the data set
      metadata = data.metadata;
  
    // Pre-Populate data into the Test Subject ID select dropdown list
    // Select the d3 input element for the dropdown
      const subjectselect = d3.select("#selDataset");
  
    // Create the Test Subject ID dropdown
      testsubjects.forEach(namevalue =>{
        var option = subjectselect.append("option");
        option.text(namevalue);
        option.attr("value",namevalue);
      });
  
    // Build arrays for the primary axes and labels for the bar plot.
    
      let sampvalues = samples[0].sample_values;
      let otuids = samples[0].otu_ids;
      let otulabels = samples[0].otu_labels;
    
    // Slice the first 10 objects for plotting on bar chart
      sampvalues = sampvalues.slice(0, 10);
      otuids = otuids.slice(0, 10);
      otulabels = otulabels.slice(0,10);
  
    // Format OTU ID string
      let otuidslist = otuids.map(otuid => 'OTU ' + otuid);
  
    // Reverse the arrays to meet Plotly's default requirements
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
  
    // // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 OTUs Found in Chosen Individuals"
    };
  
    // Render the plot to the div tag with id "bar"
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
        colorscale: [[0,'rgb(0,0,255)'],[1,'rgb(255,0,0)']]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'All Samples Collected from the Chosen Subject',
      showlegend: false
    };
      Plotly.newPlot('bubble', data, layout);
  

    // Create the Demographic Data panel
    
      d3.select("#sample-metadata").append("p").text('ID: '+ metadata[0].id);
      d3.select("#sample-metadata").append("p").text('Ethnicity: '+ metadata[0].ethnicity);
      d3.select("#sample-metadata").append("p").text('Gender: '+ metadata[0].gender);
      d3.select("#sample-metadata").append("p").text('Age: '+ metadata[0].age);
      d3.select("#sample-metadata").append("p").text('Location: '+ metadata[0].location);
      d3.select("#sample-metadata").append("p").text('Bbtype: '+ metadata[0].bbtype);
      d3.select("#sample-metadata").append("p").text('Wfreq: '+ metadata[0].wfreq);
    
      
     // Plot the Belly button washing Gauge chart 
     
       initGaugeChart();
    });
  };  
  // End of init() function
  // Call updatePlotly() when a change takes place to the DOM
  
  
  d3.selectAll("body").on("change", updatePlotly);
  
  var CHART = d3.selectAll("#bar").node();
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var subjectselect = d3.select("#selDataset");
  
    // Assign the value of the dropdown menu option to a variable
    var dataset = subjectselect.node().value;
      
    // Find the index of the subject in the testsubjects array

      let subjectindex = testsubjects.indexOf(dataset);
    
    // Build arrays for the primary axes and labels for the bar plot.
      let sampvalues = samples[subjectindex].sample_values;
      let otuids = samples[subjectindex].otu_ids;
      let otulabels = samples[subjectindex].otu_labels;
  
    // Slice the first 10 objects for plotting - bar chart requirement
      sampvalues = sampvalues.slice(0, 10);
      otuids = otuids.slice(0, 10);
      otulabels = otulabels.slice(0,10);
  
    // Format OTU ID string
      let otuidslist = otuids.map(otuid => 'OTU ' + otuid);
  
    // Reverse the array due to Plotly's defaults
      sampvalues = sampvalues.reverse();
      otuidslist = otuidslist.reverse();
      otulabels = otulabels.reverse();
  
    // Trace variables for the the bar chart
      x = sampvalues;
      y = otuidslist;
      text = otulabels;
  
   
    // Re-style the Bar chart  
    
      Plotly.restyle(CHART, "x", [x]);
      Plotly.restyle(CHART, "y", [y]);
      Plotly.restyle(CHART, "text", [text]);
  
    
    // Re-Plot the Bubble chart  
      var trace1 = {
        x: samples[subjectindex].otu_ids,
        y: samples[subjectindex].sample_values,
        text: samples[subjectindex].otu_labels,
        mode: 'markers',
        marker: {
          size: samples[subjectindex].sample_values,
          color: samples[subjectindex].otu_ids,
          colorscale: [[0,'rgb(0,0,2)'],[1,'rgb(255,0,0)']]
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'All Samples Collected from the Chosen Subject',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);
  
    // Demographic Data Refresh after first clearing the previously selected/updated demographic data
  
      d3.select("#sample-metadata").selectAll('p').remove();
  
      d3.select("#sample-metadata").append("p").text('ID: '+ metadata[subjectindex].id);
      d3.select("#sample-metadata").append("p").text('Ethnicity: '+ metadata[subjectindex].ethnicity);
      d3.select("#sample-metadata").append("p").text('Gender: '+ metadata[subjectindex].gender);
      d3.select("#sample-metadata").append("p").text('Age: '+ metadata[subjectindex].age);
      d3.select("#sample-metadata").append("p").text('Location: '+ metadata[subjectindex].location);
      d3.select("#sample-metadata").append("p").text('Bbtype: '+ metadata[subjectindex].bbtype);
      d3.select("#sample-metadata").append("p").text('Wfreq: '+ metadata[subjectindex].wfreq);
  
     
     // Call function to restyle Belly button washing Gauge chart restyle

  
      restyleGaugeChart(subjectindex);
  }
  // End of updatePlotly()
  
  init();