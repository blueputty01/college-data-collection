const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

// open links.txt and read each line
const fs = require('fs');
const rawColleges = fs.readFileSync('links.txt', 'utf-8').split('\r\n');
const colleges = rawColleges.filter(Boolean);

const getUUID = (url: string): string => {
  const [uuid] =
    url.match('[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}') ??
    [];
  return uuid;
};

const getHobsonsId = (uuid: string): Promise<string> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/college/uuid/${uuid}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<string>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const res = response.data as UUIDResponse;
        resolve(res.hobsonsId.toString());
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getCollegeProfile = (id: string): Promise<FullProfile> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/collegeprofile/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<FullProfile>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const { fullProfile } = response.data as StatResponse;
        resolve(fullProfile);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getAppStats = (uuid: string): Promise<AppStatistics> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/application-statistics/uuid/${uuid}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<AppStatistics>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const data = response.data as AppStatistics;
        resolve(data);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getInfoFromUrl = async (url: string) => {
  const uuid = getUUID(url);
  const apps = await getAppStats(uuid);
  const id = await getHobsonsId(uuid);
  const profile = await getCollegeProfile(id);
  return { profile, apps, url };
};

const scrubStats = ({
  url,
  apps,
  profile,
}: {
  apps: AppStatistics;
  profile: FullProfile;
  url: string;
}) => {
  const studentBody = profile.studentbody.field_he_studentbodyid_ref;

  const ratio = studentBody.field_he_studentfacultyratio;
  const undergradSize = studentBody.calc_he_undergraduatesize;

  const maleGradSize = studentBody.field_he_numgradmales;
  const femaleGradSize = studentBody.field_he_numgradfemales;
  const gradSize = maleGradSize + femaleGradSize;

  const totalSize = undergradSize + gradSize;

  const classroomSize = profile.general.field_he_avg_class_size;

  // const admissions =
  //   profile.international_admissions.field_he_intadmissions_ref
  //     .admission_general_us;
  const admissions =
    profile.undergraduate_admissions.field_he_undergradadmission_ref
      .admission_general;

  const received = parseInt(admissions.field_he_applications_received);
  const accepted = parseInt(admissions.field_he_applications_accepted);

  const acceptanceRate = (accepted / received) * 100;
  const roundedRate = Math.round(acceptanceRate * 100) / 100;

  const finance =
    profile.undergraduate_financial_aid.field_he_undergradfinaidid_ref
      .financial_aid_general.field_he_financial_profile;

  const tuition = parseInt(
    finance.find(
      (f) =>
        f.field_he_financialaidprofiletype === 'Avg. Net Price (income >110k)'
    )?.field_he_value ?? '0'
  );

  const citySize = profile.general.field_he_city_size;

  const wwpAccepted = apps.applicationsByYear[2022]?.totalAccepted ?? 0;
  const wwpApplied = apps.applicationsByYear[2022]?.totalApplied ?? 0;

  const wwpRate = Math.round((wwpAccepted / wwpApplied) * 100 * 100) / 100;

  const sat = apps.applicationStatistics.accepted.sat;

  const sat25 = sat.satTotal[25];
  const sat75 = sat.satTotal[75];

  const getDeadline = (type: string) => {
    const deadlineObject = profile.deadlines.find(
      ({ deadline }) => deadline.field_he_deadlinetype === type
    )?.deadline;

    if (deadlineObject) {
      // const string = `${deadlineObject?.field_he_day_of_the_deadline}, ${deadlineObject?.field_he_deadlinetype}`;
      const day = deadlineObject?.field_he_day_of_the_deadline;
      const month = deadlineObject?.field_he_month_of_the_deadline;
      const string = `${month}/${day}/${month > 8 ? 2022 : 2023}`;
      return string;
    }
    return '';
  };

  const name = profile.general.field_he_name;
  console.log(name);

  return {
    url,
    name,
    ratio,
    undergradSize,
    totalSize,
    classroomSize,
    acceptanceRate: roundedRate,
    tuition,
    citySize,
    wwpAccepted,
    wwpApplied,
    wwpRate,
    sat25,
    sat75,
    rea: getDeadline('Restricted Early Action'),
    earlyAction: getDeadline('Early Action'),
    earlyDecision: getDeadline('Early Decision'),
    earlyDecision2: getDeadline('Early Decision II'),
    regularDecision: getDeadline('Regular Decision'),
  };
};

const main = async () => {
  const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      { id: 'url', title: 'URL' },
      { id: 'name', title: 'Name' },
      { id: 'ratio', title: 'Faculty-Student Ratio' },
      { id: 'undergradSize', title: 'Undergraduate Size' },
      { id: 'totalSize', title: 'Total Size' },
      { id: 'classroomSize', title: 'Average Classroom Size' },
      { id: 'acceptanceRate', title: 'Acceptance Rate' },
      { id: 'tuition', title: 'Tuition' },
      { id: 'citySize', title: 'City Size' },
      { id: 'wwpAccepted', title: 'Accepted - WWP' },
      { id: 'wwpApplied', title: 'Applied - WWP' },
      { id: 'wwpRate', title: 'Acceptance Rate - WWP' },
      { id: 'sat25', title: 'WWP SAT 25th percentile' },
      { id: 'sat75', title: 'WWP SAT 75th percentile' },
      // { id: 'octoberDeadline', title: 'October Deadline' },
      // { id: 'novemberDeadline', title: 'November Deadline' },
      // { id: 'decemberDeadline', title: 'December Deadline' },
      // { id: 'januaryDeadline', title: 'January Deadline' },
      { id: 'rea', title: 'Restricted Early Action' },
      { id: 'earlyAction', title: 'Early Action' },
      { id: 'earlyDecision', title: 'Early Decision' },
      { id: 'earlyDecision2', title: 'Early Decision II' },
      { id: 'regularDecision', title: 'Regular Decision' },
    ],
  });
  const data = [];

  for await (const url of colleges) {
    const stats = await getInfoFromUrl(url);
    data.push(scrubStats(stats));
  }

  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));
};

main();
