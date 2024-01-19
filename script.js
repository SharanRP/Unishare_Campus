// script.js

let svgDocument; // Variable to store the SVG document
let lastHighlightedElementId; // Variable to store the ID of the last highlighted element

function loadSVG(svgFileName) {
    const mapContainer = document.getElementById('mapContainer');
    const objectElement = document.createElement('object');
    objectElement.type = 'image/svg+xml';
    objectElement.data = svgFileName; // The SVG filename
    objectElement.style.width = '100%';
    objectElement.style.height = '100%';

    objectElement.addEventListener('load', function () {
        // SVG has loaded, store the SVG document
        svgDocument = objectElement.contentDocument;
    });

    mapContainer.appendChild(objectElement);
}

function selectDestination() {
    const dropdown = document.getElementById('destination');
    const selectedValue = dropdown.value;

    if (selectedValue) {
        toggleHighlight(selectedValue);
    }
}

function toggleHighlight(destinationId) {
    console.log('Toggling highlight for:', destinationId);

    if (svgDocument) {
        const building = svgDocument.getElementById(destinationId);

        if (building) {
            if (destinationId === lastHighlightedElementId) {
                // If the same element is clicked again, remove the highlight
                building.style.fill = ''; // Reset to default style
                lastHighlightedElementId = null;
            } else {
                // Remove highlight from the last highlighted element, if any
                if (lastHighlightedElementId) {
                    const lastHighlightedElement = svgDocument.getElementById(lastHighlightedElementId);
                    if (lastHighlightedElement) {
                        lastHighlightedElement.style.fill = ''; // Reset to default style
                    }
                }

                // Highlight the new element
                building.style.fill = 'black';
                lastHighlightedElementId = destinationId;
            }
        } else {
            console.log('Building element not found');
        }
    } else {
        console.log('SVG document not accessible');
    }
}

// Load the SVG file by name when the script is executed
loadSVG('map_ground.svg'); // Replace 'your_campus_map.svg' with the actual SVG filename
