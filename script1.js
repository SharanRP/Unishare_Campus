// Define the destinations and their corresponding maps
const destinations = [
    { id: "DRIVERS_AND_CONTROL_LAB", map: "map_ground_floor" },
    { id: "LIBRARY", map: "map_main_1st" },
    // Add more destinations as needed
  ];
  
  // Populate the dropdown options
  const destinationDropdown = document.getElementById("destination");
  
  destinations.forEach(destination => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.text = destination.id;
    destinationDropdown.add(option);
  });
  
  // Function to update the displayed map based on the selected destination
  function updateMap() {
    const selectedDestination = destinationDropdown.value;
    const selectedMap = destinations.find(dest => dest.id === selectedDestination)?.map;
  
    if (selectedMap) {
      // Load and display the selected map
      const mapContainer = document.getElementById("map-container");
      mapContainer.innerHTML = ''; // Clear existing content
      const imgElement = document.createElement("img");
      imgElement.src = `${selectedMap}.svg`;
      imgElement.alt = "Map";
      mapContainer.appendChild(imgElement);
  
      // Highlight the corresponding building
      highlightBuilding(selectedDestination, selectedMap);
    }
  }
  
  // Function to highlight the building in the SVG
// Function to highlight the building in the SVG
function highlightBuilding(destinationId, mapName) {
    // Assuming the buildings have IDs in the SVG
    const buildingId = getBuildingId(destinationId);
    console.log(buildingId);
    const buildingElement = document.getElementById(`${mapName}_${buildingId}`);
    console.log('done1');
    console.log(buildingElement);
    // Remove existing highlighting from all elements
    const allBuildings = document.querySelectorAll('[id^="building_"]');
    allBuildings.forEach(element => {
        // Assuming the fill attribute is used for highlighting paths
        element.setAttribute('fill', '');
        console.log('done2');
    });

    // Add highlighting to the selected building
    if (buildingElement) {
        // Assuming the fill attribute is used for highlighting paths
        buildingElement.setAttribute('fill', 'darkblue');
        console.log('done');
    }
}

  
  // Function to get the building ID from the destination ID
  function getBuildingId(destinationId) {
    // Customize this function based on your actual naming convention
    // In this example, we assume removing underscores and converting to uppercase
    return destinationId.replace(/_/g, "").toUpperCase();
  }
  