import React, { useState } from 'react';
import styles from '../style';
import { pdficon } from '../assets/index';

const Papers = () => {
  const years = ['2018', '2019', '2020', '2021', '2022', '2023'];
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const [selectedSemeter, setSelectedSemester] = useState(years[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const papersData = [
    { sem: 'I', year: '2018', title: 'Paper A', link: 'https://drive.google.com/drive/folders/0Bx7IrwIRxV6xSnEwQWNwYkJNaUE?resourcekey=0-tRaj67yxFBZs0AvIc9v6UQ' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
    { sem: 'I', year: '2018', title: 'Paper A', link: '' },
  ];

  const filteredPapers = papersData.filter(
    (paper) => paper.year === selectedYear,
  );

  return (
    <section
      className={`bg-primary ${styles.paddingY} ${styles.paddingX} ${styles.boxWidth} text-white`}
    >
      <div
        className={`outer border flex flex-col flex-1 ${styles.paddingX} sm:p-0 ${styles.flexCenter} ${styles.boxWidth}`}
      >
        <div className="one py-6 mb-5 flex flex-1  flex-col  justify-evenly gap-5  w-full">
          <div className="text-center">
            <h1
              id="typing-text"
              className="heroHeading font-poppins font-semibold text-nowrap text-[45px] sm:text-[50px] md:text-[68px]"
            >
              Free Pdfs for you
            </h1>
          </div>
          <div className='flex items-center justify-center gap-10 max-w-[400px]:'>
            <select
              value={selectedSemeter}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className=" bg-white font-semibold text-[1.2rem] text-gray-800 w-[150px] rounded py-1 px-4"
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className=" bg-white font-semibold text-[1.2rem] text-gray-800 w-[150px] rounded py-1 px-4"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`two ${styles.paddingY} md:p-10 w-full`}
        >
          <div className="two-one grid gap-10 grid-cols-2 ss:grid-cols-3 smm:grid-cols-4 md:grid-cols-5 justify-items-center  ">
            {filteredPapers.map((paper, index) => (
              <div key={index} className="border flex flex-col justify-center items-center px-5 pt-7 pb-4 rounded-lg transform transition duration-200 hover:scale-105 min-w-[140px]">
                <a href={paper.link} target='_blank' className="mb-5">
                  <img src={pdficon} width="100" alt="" />
                </a>
                <a href={paper.link} target='_blank' className="text-gray-200 hover:text-orange-200">
                  {paper.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Papers;
