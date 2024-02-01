import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Spinner } from '@chakra-ui/react';
import '.././index.css';
let svgDocuments = {}; // Object to store multiple SVG documents
let lastHighlightedElementId;
let currentSvgFileName;
let svgFileName;
let fullFilePath;

// Import your SVG files here
import map_ground_floor from '../svg/map_ground_floor.svg';
import map_main_1st from '../svg/map_main_1st.svg';
import map_main_2nd from '../svg/map_main_2nd.svg';
import map_main_3rd from '../svg/map_main_3rd.svg';
import map_mech_1st from '../svg/map_mech_1st.svg';
import map_mech_2nd from '../svg/map_mech_2nd.svg';
import map_mech_3rd from '../svg/map_mech_3rd.svg';
import map_mech_tpo from '../svg/map_mech_tpo.svg';

const destinations = [
  { id: 'DRIVERS_AND_CONTROL_LAB', map: map_ground_floor },
  { id: 'LIBRARY', map: map_main_1st },
  { id: 'CL_301', map: map_mech_3rd },
  { id: 'CL_302', map: map_mech_3rd },
  { id: 'CL_304', map: map_mech_3rd },
  { id: 'CL_305', map: map_mech_3rd },
  { id: 'OFFICE', map: map_mech_1st },
  { id: 'COMPUTATIONAL_FLUID_DYNAMICS_LAB', map: map_mech_1st },
  { id: 'MEASUREMENT_LAB', map: map_mech_1st },
  { id: 'R_A_C___CRYOGENICS_LAB', map: map_mech_1st },
  { id: 'HEAD_OFFICE', map: map_mech_1st },
  { id: 'CL102', map: map_mech_1st },
  { id: 'DL201', map: map_mech_1st },
  { id: 'CL101', map: map_mech_1st },
  { id: 'MSG_GUEST_ROOM', map: map_mech_1st },
  { id: 'DL202', map: map_mech_1st },
  { id: 'DEPARTMENT_OFFICE_OF_HUMANITIE__MATHS___PHYSICS', map: map_mech_1st },
  { id: 'MRS._KIMAYA_INDULKAR_MR._SWATI_BOTE', map: map_mech_1st },
  { id: 'DR._NILIMA_CHAUDHARY_DR._KARUNA_RAJANI', map: map_mech_1st },
  { id: 'PROF._KISHORE_BORASE', map: map_mech_1st },
  { id: 'MISHRA_SIR', map: map_mech_1st },
  { id: 'FITTING_SHOP', map: map_mech_1st },
  { id: 'CARPENTRY_SHOP', map: map_mech_1st },
  { id: 'CL207', map: map_mech_2nd },
  { id: 'CL204', map: map_mech_2nd },
  { id: 'CAD_CAM_LAB_1', map: map_mech_2nd },
  { id: 'CASTING_SIMULATION_LAB', map: map_mech_2nd },
  { id: 'PROD_DEPARTMENT_LIBRARY', map: map_mech_2nd },
  { id: 'DR._DATTAJI_K._SHINDE__PROD_HOD_', map: map_mech_2nd },
  { id: 'PRODUCTION_DEPARTMENT_OFFICE', map: map_mech_2nd },
  { id: 'CCF_2_LAB', map: map_mech_2nd },
  { id: 'CL203', map: map_mech_2nd },
  { id: 'METALLURGY_LAB', map: map_mech_2nd },
  { id: 'PROF._D._V._PENDAM', map: map_mech_2nd },
  { id: 'PROF._P._R._ATTAR', map: map_mech_2nd },
  { id: 'PROF._SUDARSHAN_GUJRE', map: map_mech_2nd },
  { id: 'DR._SACHIN_MASTUD', map: map_mech_2nd },
  { id: 'DR._W._S._RATHOD', map: map_mech_2nd },
  { id: 'VIBRATION_LAB', map: map_mech_2nd },
  { id: 'PG_LAB', map: map_mech_2nd },
  { id: 'CL201', map: map_mech_2nd },
  { id: 'CL202', map: map_mech_2nd },
  { id: 'LOW_TEMP_PLASMA_PROCESSING_LABORATORY', map: map_mech_2nd },
  { id: 'DR._N._P._GULHANE', map: map_mech_2nd },
  { id: 'PROD_COMPUTER_LAB_1___2', map: map_mech_2nd },
  { id: 'PHYSICS_LAB_DEGREE', map: map_mech_2nd },
  { id: 'PHYSICS_LAB_DIPLOMA', map: map_mech_2nd },
  { id: 'PROF._TUSHAR_MORE', map: map_mech_2nd },
  { id: 'PROF._SHREYA_KELKAR', map: map_mech_2nd },
  { id: 'PROF._ASHWINI_MODI', map: map_mech_2nd },
  { id: 'DR._DATTATRAY_WAVHAL', map: map_mech_2nd },
  { id: 'PRODUCTION_ENGINEERING_DEPARTMENT', map: map_mech_2nd },
  { id: 'AL303', map: map_main_3rd },
  { id: 'AL304', map: map_main_3rd },
  { id: 'TERRACE', map: map_main_3rd },
  { id: 'AL302', map: map_main_3rd },
  { id: 'MCA_LABORATORIES', map: map_main_3rd },
  { id: 'AL301', map: map_main_3rd },
  { id: 'MCA_OFFICE', map: map_main_3rd },
  { id: 'PROF._N._B._KHANDARE', map: map_main_3rd },
  { id: 'HEAD_OF_MCA_DEPARTMENT', map: map_main_3rd },
  { id: 'COMPUTER_NETWORKING_AND_LABORATORY_4', map: map_main_3rd },
  { id: 'DRAWING_HALL', map: map_main_2nd },
  { id: 'GEOLOGY_LAB', map: map_main_2nd },
  { id: 'PG_STUDY_ROOM', map: map_main_2nd },
  { id: 'DIGITAL_PROCESSING_LAB', map: map_main_2nd },
  { id: 'COMPUTER___OTHER_LABS', map: map_main_2nd },
  { id: 'BASIC_COMMUNICATION_LAB', map: map_main_2nd },
  { id: 'MICROWAVE_LAB', map: map_main_2nd },
  { id: 'COMPUTER_COMMUNICATION_LAB', map: map_main_2nd },
  { id: 'AL201', map: map_main_2nd },
  { id: 'AL202', map: map_main_2nd },
  { id: 'AL207', map: map_main_2nd },
  { id: 'PROF._VIKRAM_KEHRI', map: map_main_2nd },
  { id: 'DR._D._P._RATHOD', map: map_main_2nd },
  { id: 'PROF._AMI_DAPKAWALA', map: map_main_2nd },
  { id: 'INTEGRATED_CIRCUIT_LAB', map: map_main_2nd },
  { id: 'BHARTIYA_KAMGARSENA_OFFICE', map: map_main_2nd },
  { id: 'LIBRARY_2ND_FLOOR', map: map_main_2nd },
  { id: 'AL203', map: map_main_2nd },
  { id: 'AL204', map: map_main_2nd },
  { id: 'AL205', map: map_main_2nd },
  { id: 'AL206', map: map_main_2nd },
  { id: 'MANAGEMENT_INFORMATION_SYSTEM_LABORATORY', map: map_main_2nd },
  { id: 'PROF._SOWMIYA_RAKSHA_NAIK__PROF._M._U._KULKARNI', map: map_main_2nd },
  { id: 'DR._M._M._CHANDANE__PROF._K._K._JOSHI', map: map_main_2nd },
  { id: 'PROF._VARSHA__PRIYA_J.N.', map: map_main_2nd },
  { id: 'STAIRS', map: map_ground_floor },
  { id: 'PRODUCTION_TOOLING_LAB', map: map_ground_floor },
  { id: 'SMITHY_WORKSHOP', map: map_ground_floor },
  { id: 'ROBOTICS_AND_AUTOMATION', map: map_ground_floor },
  { id: 'WIND_TUNNEL', map: map_ground_floor },
  { id: 'AUTOMOBILE_LAB', map: map_ground_floor },
  { id: 'TECHNICAL_EXCELLENCE_CENTER', map: map_ground_floor },
  { id: 'LECTURE_ROOMS', map: map_ground_floor },
  { id: 'SHRI._R._M._TAYDE', map: map_ground_floor },
  { id: 'HEAT_ENGINE_LAB', map: map_ground_floor },
  { id: 'CHEMISTRY_LAB', map: map_ground_floor },
  { id: 'DEPARTMENT_OFFICE', map: map_ground_floor },
  { id: 'RESEARCH_LAB', map: map_ground_floor },
  { id: 'ENVIRONMENT_LAB', map: map_ground_floor },
  { id: 'DT001', map: map_ground_floor },
  { id: 'NCC_MAIN_OFFICE', map: map_ground_floor },
  { id: 'OFFICER_COMMANDING_COL_JD_SAHASTRABUDHE', map: map_ground_floor },
  { id: 'OFFICER_WASHROOM', map: map_ground_floor },
  { id: 'DL001', map: map_ground_floor },
  { id: 'DL002', map: map_ground_floor },
  { id: 'S_JCO', map: map_ground_floor },
  { id: 'PRODUCTION_PROCESS_LAB', map: map_ground_floor },
  { id: 'GUI_LAB', map: map_ground_floor },
  { id: 'SRA', map: map_ground_floor },
  { id: 'MACHINE_WORKSHOP', map: map_ground_floor },
  { id: 'STORE_ROOM', map: map_ground_floor },
  { id: 'XEROX_SHOP', map: map_ground_floor },
  { id: 'ATM', map: map_ground_floor },
  { id: 'DIRECTOR_S_BUNGLOW', map: map_ground_floor },
  { id: 'TEXTILE_HALL', map: map_ground_floor },
  { id: 'INTERNET_LAB', map: map_ground_floor },
  { id: 'TEXTILE_DEPARTMENT', map: map_ground_floor },
  { id: 'DR._SURANJANA_GANGOPADHYAY', map: map_ground_floor },
  { id: 'ALUMNI_ASSOCIATION_OFFICE', map: map_ground_floor },
  { id: 'CONSTRUCTION_AND_MAINTAINIENCE_ACTIVITIES_CELL', map: map_ground_floor },
  { id: 'PLUMBING', map: map_ground_floor },
  { id: 'TRANSPORTATION_ENGINEERING_LAB', map: map_ground_floor },
  { id: 'HYDROLOGY_LAB', map: map_ground_floor },
  { id: 'FLUID_MECHANICS', map: map_ground_floor },
  { id: 'CONCRETE_TECHNOLOGY_LAB', map: map_ground_floor },
  { id: 'STRUCTURAL_ENGINEERING', map: map_ground_floor },
  { id: 'BLOCKCHAIN_LAB', map: map_ground_floor },
  { id: 'TEQUIP_II', map: map_ground_floor },
  { id: 'AUDITORIUM', map: map_ground_floor },
  { id: 'CANTEEN', map: map_ground_floor },
  { id: 'CANTEEN__FOR_STAFF_', map: map_ground_floor },
  { id: 'ELECTRICAL_DEPT_COMPUTER_LAB', map: map_ground_floor },
  { id: 'BIOMEDICAL_RESEARCH', map: map_ground_floor },
  { id: 'ELECTRICAL_MACHINE_LAB', map: map_ground_floor },
  { id: 'VLSI_LAB', map: map_ground_floor },
  { id: 'AL005', map: map_ground_floor },
  { id: 'COE_LAB', map: map_ground_floor },
  { id: 'BEE_LAB', map: map_ground_floor },
  { id: 'VJTI_TBI', map: map_ground_floor },
  { id: 'AL003', map: map_ground_floor },
  { id: 'AL002', map: map_ground_floor },
  { id: 'CS_IT_LAB_2', map: map_ground_floor },
  { id: 'CS_IT_LAB_3', map: map_ground_floor },
  { id: 'DR._N._M._SINGH', map: map_ground_floor },
  { id: 'DR._SUDHIR_K._BHIL_PROF._RAHUL_INGALE', map: map_ground_floor },
  { id: 'PROF._ASHA_SHARMA_PROF._SUSHAMA_WAGH', map: map_ground_floor },
  { id: 'IOT_LAB', map: map_ground_floor },
  { id: 'VJTI_SIMENS_AICTE_HIGH_VOLTAGE_LAB', map: map_ground_floor },
  { id: 'CCF1', map: map_ground_floor },
  { id: 'LANGUAGE_LAB', map: map_ground_floor },
  { id: 'AL004', map: map_ground_floor },
  { id: 'STAGE', map: map_ground_floor },
  { id: 'DEP_2', map: map_ground_floor },
  { id: 'DEP_1', map: map_ground_floor },
  { id: 'RAILWAY_CONCESSION', map: map_ground_floor },
  { id: 'HOSTEL_1', map: map_ground_floor },
  { id: 'HOSTEL_2', map: map_ground_floor },
  { id: 'FOOTBALL_GROUND', map: map_ground_floor },
  { id: 'CRICKET_GROUND', map: map_ground_floor },
  { id: 'TEXTILE_GARDEN', map: map_ground_floor },
  { id: 'GYMKHANA', map: map_ground_floor },
  { id: 'HOD_OFFICE_CHEMISTRY_DEPARTMENT', map: map_ground_floor },
  { id: 'EL002', map: map_ground_floor },
  { id: 'FACULTY_CABIN', map: map_ground_floor },
  { id: 'FLUID_FLOW__HEAT_TRANSFER__MASS_FLOW_OPERATION_LAB', map: map_ground_floor },
  { id: 'PG_SEMINAR_HALL', map: map_main_1st },
  { id: 'DR._J._G._SOLANKI', map: map_main_1st },
  { id: 'DEPT_OFFICE', map: map_main_1st },
  { id: 'CIVIL_DEPT_LIBRARY', map: map_main_1st },
  { id: 'CIVIL_HOD_CABIN', map: map_main_1st },
  { id: 'ENVIRONMENTAL_ENGINEERING_LAB_2', map: map_main_1st },
  { id: 'AL106', map: map_main_1st },
  { id: 'CIVIL_SEMINAR_HALL', map: map_main_1st },
  { id: 'AL101', map: map_main_1st },
  { id: 'PROJECT_LAB', map: map_main_1st },
  { id: 'AL102', map: map_main_1st },
  { id: 'AL103', map: map_main_1st },
  { id: 'IOT_LAB ', map: map_main_1st },
  { id: 'ELECTRICAL_OFFICE', map: map_main_1st },
  { id: 'MICROPROCESSOR_LAB', map: map_main_1st },
  { id: 'ELECTRICAL_HOD_CABIN', map: map_main_1st },
  { id: 'DEPT_LAB', map: map_main_1st },
  { id: 'CONTROL_INSTRUMENTATION_LAB', map: map_main_1st },
  { id: 'INDUSTRIAL_ELECTRONICS_LAB', map: map_main_1st },
  { id: 'BIO_MEDICAL_LAB', map: map_main_1st },
  { id: 'AT102', map: map_main_1st },
  { id: 'AT103', map: map_main_1st },
  { id: 'STAFF_CABIN', map: map_main_1st },
  { id: 'VIRTUAL_INSTRUMENTATION_LAB', map: map_main_1st },
  { id: 'AT104', map: map_main_1st },
  { id: 'COE_COMMUNICATION_LAB', map: map_main_1st },
  { id: 'PROF._P._M._CHAWAN__PROF._S._T._SHINGADE', map: map_main_1st },
  { id: 'DR._S._G._BHIRUD__DR._G._P._BHOLE', map: map_main_1st },
  { id: 'PROF._S._C._SHRAWNE__DR._V._K._SAMBHE', map: map_main_1st },
  { id: 'DR._M._R._SHIROLE__DR._S._S._UDMALE', map: map_main_1st },
  { id: 'SEMINAR_HALL_CS_IT', map: map_main_1st },
  { id: 'DEPARTMENT_OFFICE_CS_IT', map: map_main_1st },
  { id: 'HOD_OFFICE_CS_IT', map: map_main_1st },
  { id: 'LIBRARY_OFFICE', map: map_main_1st },
  { id: 'EXAM_SECTION', map: map_main_1st },
  { id: 'AT105', map: map_main_1st },
  { id: 'ENVIRONMENTAL_ENGINEERING_LAB', map: map_main_1st },
  { id: 'PG_LAB ', map: map_main_1st },
  { id: 'STORE_SECTION', map: map_main_1st },
  { id: 'DISCUSSION_ROOM', map: map_main_1st },
  { id: 'P.A._TO_DIRECTOR', map: map_main_1st },
  { id: 'DIRECTOR_S_OFFICE', map: map_main_1st },
  { id: 'HOD_OFFICE', map: map_main_1st },
  { id: 'AL104', map: map_main_1st },
  { id: 'DR._P._W._KUBDE', map: map_main_1st },
  { id: 'PROF._SANDEEP_NARAYAN_RANSHUR', map: map_main_1st },
  { id: 'DEPT_EXAM_SECTION', map: map_main_1st },
  { id: 'DR._S._S._PENDHARI', map: map_main_1st },
  { id: 'DR._V._B._DESHMUKH', map: map_main_1st },
  { id: 'PG_COMPUTATIONAL_HALL', map: map_main_1st },
  { id: 'ADMINISTRATION___ACADEMICS_SECTION', map: map_main_1st },
  { id: 'DEAN_OF_ACADEMICS__DR._K._K.SANLE', map: map_main_1st },
  { id: 'DR._ABHAY_BANBOLE', map: map_main_1st },
  { id: 'REGISTRAR', map: map_main_1st },
  { id: 'DEAN_OFFICE', map: map_main_1st },
  { id: 'ADMINISTRATION', map: map_main_1st },
  { id: 'SCHOLARSHIP_SECTION', map: map_main_1st },
  { id: 'ACCOUNTS_SECTION', map: map_main_1st },
  { id: 'WASHROOM', map: map_main_1st },
  { id: 'EM_LAB', map: map_main_1st },






  // Add more destinations as needed
];

const svgFiles = {
  '/src/svg/map_main_1st.svg': map_main_1st,
  'map_main_2nd': map_main_2nd,
  'map_main_3rd': map_main_3rd,
  'map_mech_1st': map_mech_1st,
  'map_mech_2nd': map_mech_2nd,
  'map_mech_3rd': map_mech_3rd,
  'map_mech_tpo': map_mech_tpo,
  'map_ground_floor': map_ground_floor,
};



function InteractiveMap () {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter destinations based on the search term
    const filtered = destinations.filter(dest => dest.id.toLowerCase().includes(term.toLowerCase()));
    setFilteredDestinations(filtered);

    // If there's only one result, automatically select it
    if (filtered.length === 1) {
      setSelectedDestination(filtered[0]);
    } else {
      setSelectedDestination(null);
    }
  };

  const handleArrowClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (destination) => {
    setSelectedDestination(destination);
    setShowDropdown(false);
  };

  const handleSearchClick = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (selectedDestination) {
      // Find the <g> element corresponding to the selected destination
      console.log(selectedDestination);
      const fullFilePath = svgFiles[selectedDestination.map];
      // const svgFileName = fullFilePath.split('/').pop();
      console.log(svgFileName);
      const objectElement = document.createElement('object');
      objectElement.type = 'image/svg+xml';
      objectElement.data = svgFileName;
      objectElement.style.width = '100%';
      objectElement.style.height = '100%';
      svgDocuments[svgFileName] = objectElement.contentDocument;
      console.log(`new data ${svgDocuments}`);
      console.log(`new data ${svgDocuments[svgFileName]}`);
      currentSvgFileName = svgFileName;



      if (svgDocuments[currentSvgFileName]) {
        const building = svgDocuments[currentSvgFileName].getElementById(destinationId);
        console.log(`data ${svgDocuments[currentSvgFileName]}`);
        console.log(building);
        console.log(svgDocuments);

        if (building) {
          if (lastHighlightedElementId) {
            const lastHighlightedElement = svgDocuments[currentSvgFileName].getElementById(lastHighlightedElementId);
            if (lastHighlightedElement) {
              lastHighlightedElement.style.fill = '';
            }
          }

          building.style.fill = 'darkblue';
          lastHighlightedElementId = destinationId;
        } else {
          console.log('Building element not found');
        }
      } else {
        console.log('SVG document not accessible');
      }
    }
  }, [selectedDestination]);




  return (
    <div className="container items-center mx-auto py-8 bg-transparent mb-12 px-2 text-black">
      <h1 className="text-2xl flex justify-center items-center font-bold mb-4 ">
        Enter the destination
      </h1>

      {/* Single Search Bar with Dropdown */}
      <div className="relative w-1/2 mx-auto mb-4">
        <div className="flex items-center border rounded px-1 py-2 bg-white">
          <input
            type="text"
            id="search"
            className="w-full focus:outline-none"
            placeholder="Search for a building or path..."
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleSearchClick}
          />
          <div className="cursor-pointer ml-2" onClick={handleArrowClick}>
            <span className={`arrow ${showDropdown ? 'up' : 'down'}`}>&#9660;</span>
          </div>
        </div>
        {showDropdown && (
          <div className="absolute bg-white w-full border border-gray-300 mt-1 rounded">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                onClick={() => handleOptionClick(destination)}
              >
                {destination.id}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SVG Map */}
      <div className="flex justify-center mt-12 items-center bg-transparent mb-12 py-6">
        {selectedDestination && (
          <ReactSVG
            src={selectedDestination.map}
            className="svg-class-name w-full h-max "
            beforeInjection={(svg) => {
              svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
              svg.classList.add('svg-class-name');

              // Apply styles based on the highlighted attribute
              if (svg.getAttribute('highlighted')) {
                svg.style.fill = '#ffcc00'; // Customize the fill color
                svg.style.stroke = '#000';
                svg.style.strokeWidth = '2';
              }
            }}
            wrapper="div"
            loading={() => <span><Spinner className=' m-auto flex justify-center items-center text-center text-white h-12 w-12 ' /> </span>}
          />
        )}
        {!selectedDestination && (
          <p className="text-center pt-24">Select a destination to view the map</p>
        )}
      </div>
    </div>
  );
}

export default InteractiveMap;
