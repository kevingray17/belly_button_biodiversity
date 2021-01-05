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

    



    })
}