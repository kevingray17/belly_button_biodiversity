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
    //[0] is used b/c the first subject ID is 0

    let sampvalues = justsamples[0].sample_values;
    let otuids = justsamples[0].otu_ids;
    let otulabels = justsamples[0].otu_labels;
