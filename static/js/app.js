function init() {

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

      var dropdown = d3.select("#selDataset");
      data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value", name);
      });
  
      var initialName = data.names[0];
      buildCharts(initialName);
      buildMetadata(initialName);
    });
  }
  
  function optionchange(newName) {
    buildCharts(newName);
    buildMetadata(newName);
  }
  
  function buildCharts(sampleName) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var samples = data.samples;
      var selectedSample = samples.find(sample => sample.id === sampleName);
      
        var sortedSampleValues = selectedSample.sample_values.slice(0, 10).sort((a, b) => a - b);
        var sortedOTUIds = selectedSample.otu_ids.slice(0, 10).sort((a, b) => a - b);
        var sortedOTULabels = selectedSample.otu_labels.slice(0, 10);

        var barData = [{
        type: "bar",
        x: sortedSampleValues,
        y: sortedOTUIds.map(id => `OTU ${id}`),
        text: sortedOTULabels,
        orientation: "h"
        }];
  
      var barLayout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
      var bubbleData = [{
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: "markers",
        marker: {
          size: selectedSample.sample_values,
          color: selectedSample.otu_ids,
          colorscale: "Earth"
        }
      }];
  
      var bubbleLayout = {
        title: "Belly Button Biodiversity",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
      };
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  }

  function buildMetadata(sampleName) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var metadata = data.metadata;
      var selectedMetadata = metadata.find(meta => meta.id.toString() === sampleName);
  
      var metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html("");

      Object.entries(selectedMetadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
    });
  }
  
  init();
  