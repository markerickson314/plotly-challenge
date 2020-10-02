// Some of this code comes from two demos by our instructor 

function DrawBargraph(sampleID) {
    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0,10).map(otuID=> `OTU ${otuID}`).reverse();
        
        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"

        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t:75, l:75}
        }

        Plotly.newPlot("bar", [barData], barLayout);
    });
};

function DrawBubblechart(sampleID) {
    console.log(`Draw Bubblechart ${sampleID}`);
};

function Demographics(sampleID) {

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleID);
        var result = resultArray[0];

        // select the demographics panel area
        var panel = d3.select("#sample-metadata");

        // clear the previous data
        panel.html("");

        // get the data and find the sample keys and values
        Object.entries(result).forEach(([key, value]) => {

            panel.append("p").text(`${key}: ${value}`);
        });
    });   
};

// draw new graphs based on new sampleID chosen
function optionChanged(newSampleID) {
    console.log(`Option changed to ${newSampleID}`);

    DrawBargraph(newSampleID);
    DrawBubblechart(newSampleID);
    Demographics(newSampleID);
};

// function to draw initial graphs
function init() {
    
    // select the dropdown menu
    var selection = d3.select("#selDataset");

    //get the data
    d3.json("samples.json").then(function(data){
        
        // print the data to the console
        console.log(data);

        // populate the dropdown menu with ids
        data.names.forEach(ID => selection
            .append("option")
            .text(ID)
            .property("value", ID) 
        );

        // Get first sample ID
        var sampleID = data.names[0];
        console.log("Starting sample", sampleID);
    
        // Draw graphs
        DrawBargraph(sampleID);
        DrawBubblechart(sampleID);
        Demographics(sampleID);
    });
};

init();